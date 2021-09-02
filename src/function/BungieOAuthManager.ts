import BungieAuthStateQueueDAO from "../db/dao/BungieAuthStateQueueDAO";
import BungieAuthDAO from "../db/dao/BungieAuthDAO";
import {requireJson} from "../util/requireJson";
import BungieAPIWrapper from "../bungie/BungieAPIWrapper";

const bungieInfo = requireJson(__dirname + "/../../resources/bungie.json");

class BungieOAuthManager {
    private static readonly CLIENT_ID = bungieInfo.oAuthClientId;
    private static readonly CLIENT_SECRET = bungieInfo.oAuthClientSecret;
    private static readonly API_KEY = bungieInfo.apiKey;

    private static ACCESS_TOKEN_ENDPOINT = "https://www.bungie.net/platform/app/oauth/token/";
    private static OAUTH_AUTHORIZATION_ENDPOINT = "https://www.bungie.net/en/oauth/authorize";

    private constructor() {
        console.log("Initialize Bungie OAuth Manager...");
        setInterval(async () => {
            await this.clearStateQueue();
        }, 1000 * 60 * 5);
    }

    private static _instance: BungieOAuthManager = new BungieOAuthManager();

    public static get instance(): BungieOAuthManager {
        return this._instance;
    }

    private static generateState(): string {
        const s1 = Math.random().toString(36).substr(2, 11);
        const s2 = Math.random().toString(36).substr(2, 7);

        return s1 + s2;
    }

    public async addStateQueueAndGetUrl(discordId: string): Promise<string> {
        const state = BungieOAuthManager.generateState();

        const dao = new BungieAuthStateQueueDAO();

        try {
            await dao.connect();
            await dao.insertNewQueue({
                discordId: discordId,
                state: state
            });
            await dao.commit();
        } catch (e) {
            console.log("Some Error Occurred: ADD NEW OAUTH STATE QUEUE");
            console.log(e);
        } finally {
            try {
                await dao.close();
            } catch (e) {
                console.log("Some Error Occurred: FAILED TO CLOSE OAUTH STATE QUEUE DAO");
                console.log(e);
            }
        }

        return `${BungieOAuthManager.OAUTH_AUTHORIZATION_ENDPOINT}`
            + `?client_id=${BungieOAuthManager.CLIENT_ID}`
            + `&response_type=code&state=${state}`;
    }

    public async getDiscordIdFromStateQueue(state: string): Promise<string> {
        const dao = new BungieAuthStateQueueDAO();

        let discordId: string;

        try {
            await dao.connect();
            const stateQueue = await dao.queryByState(state);
            discordId = stateQueue[0];
        } catch (e) {
            throw new Error(e);
        } finally {
            try {
                await dao.close();
            } catch (e) {
                console.log("Failed to Close oAuth State Queue DAO");
                console.log(e);
            }
        }

        return discordId;
    }

    public async deleteStateQueueByState(state: string): Promise<void> {
        const dao = new BungieAuthStateQueueDAO();

        try {
            await dao.connect();
            await dao.deleteQueueByState(state);
            await dao.commit();
        } catch (e) {
            throw new Error(e);
        } finally {
            try {
                await dao.close();
            } catch (e) {
                console.log("Failed to Close oAuth State Queue DAO");
                console.log(e);
            }
        }

    }

    public async requestAccessToken(code: string): Promise<AccessToken> {
        const api = new BungieAPIWrapper(BungieOAuthManager.API_KEY, true
            , BungieOAuthManager.CLIENT_ID, BungieOAuthManager.CLIENT_SECRET);
        const result = await api.OAuth.TokenHelper.getToken(code);

        console.log("New Bungie oAuth Token Requested");

        return {
            accessToken: result.accessToken,
            tokenType: result.tokenType,
            expiresIn: result.expiresIn,
            refreshToken: result.refreshToken,
            refreshExpiresIn: result.refreshExpiresIn,
            membershipId: result.membershipId
        };
    }

    public async requestRefreshAccessToken(refreshToken: string): Promise<AccessToken> {
        const api = new BungieAPIWrapper(BungieOAuthManager.API_KEY, true
            , BungieOAuthManager.CLIENT_ID, BungieOAuthManager.CLIENT_SECRET);

        const result = await api.OAuth.TokenHelper.refreshToken(refreshToken);

        console.log("Bungie oAuth Token Refreshed");

        return {
            accessToken: result.accessToken,
            tokenType: result.tokenType,
            expiresIn: result.expiresIn,
            refreshToken: result.refreshToken,
            refreshExpiresIn: result.refreshExpiresIn,
            membershipId: result.membershipId
        };
    }

    public async saveAccessToken(discordId: string, token: AccessToken): Promise<boolean> {
        const dao = new BungieAuthDAO();

        try {
            await dao.connect();
        } catch (e) {
            console.log("Failed to Connect OAUTH DAO");
            console.log(e);

            try {
                await dao.close();
            } catch (e) {
                console.log("Failed to Close OAUTH DAO");
                console.log(e);
            }

            return false;
        }

        let isAlreadyRegistered = true;

        try {
            const q = await dao.queryByDiscordId(discordId);

            if (q == undefined || q.length <= 0) {
                throw new Error();
            }
        } catch (e) {
            isAlreadyRegistered = false;
        }

        try {
            if (isAlreadyRegistered) {
                await dao.updateUserByDiscordId({
                    discordId: discordId,
                    accessToken: token.accessToken,
                    tokenType: token.tokenType,
                    expiresIn: token.expiresIn,
                    refreshToken: token.refreshToken,
                    refreshExpiresIn: token.refreshExpiresIn,
                    membershipId: token.membershipId
                });
            } else {
                await dao.insertNewUser({
                    discordId: discordId,
                    accessToken: token.accessToken,
                    tokenType: token.tokenType,
                    expiresIn: token.expiresIn,
                    refreshToken: token.refreshToken,
                    refreshExpiresIn: token.refreshExpiresIn,
                    membershipId: token.membershipId
                });
            }
        } catch (e) {
            console.log("Some Error Occurred: INSERT or UPDATE USER AUTH INFORMATION");
        } finally {
            try {
                await dao.close();
            } catch (e) {
                console.log("Failed to Close OAUTH DAO");
                console.log(e);
            }
        }

        console.log("Bungie oAuth Token Saved to DB: " + discordId);

        return true;
    }

    public async getAccessTokenByDiscordId(discordId: string): Promise<string> {
        const dao = new BungieAuthDAO();
        const rawResult = await dao.queryByDiscordId(discordId);

        const rawAccessToken = rawResult[1] as string;
        const rawTokenType = rawResult[2] as string;
        const rawExpiresIn = rawResult[3] as number;
        const rawRefreshToken = rawResult[4] as string;
        const rawRefreshExpireIn = rawResult[5] as number;
        const membershipId = rawResult[6] as string;
        const rawAddedDate = rawResult[7] as Date;

        // When Token Expires
        if (this.compareDate(new Date(rawAddedDate.valueOf() + (rawExpiresIn * 1000)))
            == DateCompareResult.bt) {
            // When Refresh Token Expires
            if (this.compareDate(new Date(rawAddedDate.valueOf() + (rawRefreshExpireIn * 1000)))
                == DateCompareResult.bt) {
                throw new Error("Token Completely Expires. Please Re-Register Please.");
            } else {
                try {
                    const refreshedToken = await this.requestRefreshAccessToken(rawRefreshToken);
                    await this.saveAccessToken(discordId, refreshedToken);
                    return refreshedToken.accessToken;
                } catch (e) {
                    throw new Error(e);
                }
            }
        } else {
            return rawAccessToken;
        }
    }

    private async clearStateQueue(): Promise<void> {
        console.log("Try to Clear State Queue...");

        const dao = new BungieAuthStateQueueDAO();

        try {
            await dao.connect();
            const stateList = await dao.queryAll();

            for (const state of stateList) {
                const discordId = state[0] as string;
                const queuedDate = state[2] as Date;

                const targetDate = new Date(queuedDate.valueOf() + 1000 * 60 * 3);

                if (this.compareDate(targetDate) == DateCompareResult.bt) {
                    await dao.deleteQueueByDiscordId(discordId);
                    console.log("Queue Cleared: Discord ID - " + discordId);
                }
            }
            await dao.close();
        } catch (e) {
            console.log("Failed to Clear State Queue");
            console.log(e);
        }
    }

    private compareDate(d1: Date): number {
        const now = new Date();
        if (d1.valueOf() < now.valueOf()) {
            return DateCompareResult.lt;
        } else if (d1.valueOf() > now.valueOf()) {
            return DateCompareResult.bt;
        } else if (d1.valueOf() == now.valueOf()) {
            return DateCompareResult.eq;
        } else {
            return DateCompareResult.unknown;
        }
    }
}

enum DateCompareResult {
    /**
     * d1 < NOW
     */
    lt,

    /**
     * d1 > NOW
     */
    bt,

    /**
     * d1 == NOW
     */
    eq,

    /**
     * Can't Compare
     */
    unknown
}

interface RawTokenResponse {
    access_token: string,
    token_type: string,
    expires_in: number,
    refresh_token: string,
    refresh_expires_in: number,
    membership_id: string
}

interface AccessToken {
    accessToken: string,
    tokenType: string,
    expiresIn: number,
    refreshToken: string,
    refreshExpiresIn: number,
    membershipId: string
}

export default BungieOAuthManager;