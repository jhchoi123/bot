"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BungieAuthStateQueueDAO_1 = __importDefault(require("../db/dao/BungieAuthStateQueueDAO"));
const BungieAuthDAO_1 = __importDefault(require("../db/dao/BungieAuthDAO"));
const requireJson_1 = require("../util/requireJson");
const BungieAPIWrapper_1 = __importDefault(require("../bungie/BungieAPIWrapper"));
const bungieInfo = requireJson_1.requireJson(__dirname + "/../../resources/bungie.json");
class BungieOAuthManager {
    constructor() {
        console.log("Initialize Bungie OAuth Manager...");
        setInterval(async () => {
            await this.clearStateQueue();
        }, 1000 * 60 * 5);
    }
    static get instance() {
        return this._instance;
    }
    static generateState() {
        const s1 = Math.random().toString(36).substr(2, 11);
        const s2 = Math.random().toString(36).substr(2, 7);
        return s1 + s2;
    }
    async addStateQueueAndGetUrl(discordId) {
        const state = BungieOAuthManager.generateState();
        const dao = new BungieAuthStateQueueDAO_1.default();
        try {
            await dao.connect();
            await dao.insertNewQueue({
                discordId: discordId,
                state: state
            });
            await dao.commit();
        }
        catch (e) {
            console.log("Some Error Occurred: ADD NEW OAUTH STATE QUEUE");
            console.log(e);
        }
        finally {
            try {
                await dao.close();
            }
            catch (e) {
                console.log("Some Error Occurred: FAILED TO CLOSE OAUTH STATE QUEUE DAO");
                console.log(e);
            }
        }
        return `${BungieOAuthManager.OAUTH_AUTHORIZATION_ENDPOINT}`
            + `?client_id=${BungieOAuthManager.CLIENT_ID}`
            + `&response_type=code&state=${state}`;
    }
    async getDiscordIdFromStateQueue(state) {
        const dao = new BungieAuthStateQueueDAO_1.default();
        let discordId;
        try {
            await dao.connect();
            const stateQueue = await dao.queryByState(state);
            discordId = stateQueue[0];
        }
        catch (e) {
            throw new Error(e);
        }
        finally {
            try {
                await dao.close();
            }
            catch (e) {
                console.log("Failed to Close oAuth State Queue DAO");
                console.log(e);
            }
        }
        return discordId;
    }
    async deleteStateQueueByState(state) {
        const dao = new BungieAuthStateQueueDAO_1.default();
        try {
            await dao.connect();
            await dao.deleteQueueByState(state);
            await dao.commit();
        }
        catch (e) {
            throw new Error(e);
        }
        finally {
            try {
                await dao.close();
            }
            catch (e) {
                console.log("Failed to Close oAuth State Queue DAO");
                console.log(e);
            }
        }
    }
    async requestAccessToken(code) {
        const api = new BungieAPIWrapper_1.default(BungieOAuthManager.API_KEY, true, BungieOAuthManager.CLIENT_ID, BungieOAuthManager.CLIENT_SECRET);
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
    async requestRefreshAccessToken(refreshToken) {
        const api = new BungieAPIWrapper_1.default(BungieOAuthManager.API_KEY, true, BungieOAuthManager.CLIENT_ID, BungieOAuthManager.CLIENT_SECRET);
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
    async saveAccessToken(discordId, token) {
        const dao = new BungieAuthDAO_1.default();
        try {
            await dao.connect();
        }
        catch (e) {
            console.log("Failed to Connect OAUTH DAO");
            console.log(e);
            try {
                await dao.close();
            }
            catch (e) {
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
        }
        catch (e) {
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
            }
            else {
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
        }
        catch (e) {
            console.log("Some Error Occurred: INSERT or UPDATE USER AUTH INFORMATION");
        }
        finally {
            try {
                await dao.close();
            }
            catch (e) {
                console.log("Failed to Close OAUTH DAO");
                console.log(e);
            }
        }
        console.log("Bungie oAuth Token Saved to DB: " + discordId);
        return true;
    }
    async getAccessTokenByDiscordId(discordId) {
        const dao = new BungieAuthDAO_1.default();
        const rawResult = await dao.queryByDiscordId(discordId);
        const rawAccessToken = rawResult[1];
        const rawTokenType = rawResult[2];
        const rawExpiresIn = rawResult[3];
        const rawRefreshToken = rawResult[4];
        const rawRefreshExpireIn = rawResult[5];
        const membershipId = rawResult[6];
        const rawAddedDate = rawResult[7];
        // When Token Expires
        if (this.compareDate(new Date(rawAddedDate.valueOf() + (rawExpiresIn * 1000)))
            == DateCompareResult.bt) {
            // When Refresh Token Expires
            if (this.compareDate(new Date(rawAddedDate.valueOf() + (rawRefreshExpireIn * 1000)))
                == DateCompareResult.bt) {
                throw new Error("Token Completely Expires. Please Re-Register Please.");
            }
            else {
                try {
                    const refreshedToken = await this.requestRefreshAccessToken(rawRefreshToken);
                    await this.saveAccessToken(discordId, refreshedToken);
                    return refreshedToken.accessToken;
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        }
        else {
            return rawAccessToken;
        }
    }
    async clearStateQueue() {
        console.log("Try to Clear State Queue...");
        const dao = new BungieAuthStateQueueDAO_1.default();
        try {
            await dao.connect();
            const stateList = await dao.queryAll();
            for (const state of stateList) {
                const discordId = state[0];
                const queuedDate = state[2];
                const targetDate = new Date(queuedDate.valueOf() + 1000 * 60 * 3);
                if (this.compareDate(targetDate) == DateCompareResult.bt) {
                    await dao.deleteQueueByDiscordId(discordId);
                    console.log("Queue Cleared: Discord ID - " + discordId);
                }
            }
            await dao.close();
        }
        catch (e) {
            console.log("Failed to Clear State Queue");
            console.log(e);
        }
    }
    compareDate(d1) {
        const now = new Date();
        if (d1.valueOf() < now.valueOf()) {
            return DateCompareResult.lt;
        }
        else if (d1.valueOf() > now.valueOf()) {
            return DateCompareResult.bt;
        }
        else if (d1.valueOf() == now.valueOf()) {
            return DateCompareResult.eq;
        }
        else {
            return DateCompareResult.unknown;
        }
    }
}
BungieOAuthManager.CLIENT_ID = bungieInfo.oAuthClientId;
BungieOAuthManager.CLIENT_SECRET = bungieInfo.oAuthClientSecret;
BungieOAuthManager.API_KEY = bungieInfo.apiKey;
BungieOAuthManager.ACCESS_TOKEN_ENDPOINT = "https://www.bungie.net/platform/app/oauth/token/";
BungieOAuthManager.OAUTH_AUTHORIZATION_ENDPOINT = "https://www.bungie.net/en/oauth/authorize";
BungieOAuthManager._instance = new BungieOAuthManager();
var DateCompareResult;
(function (DateCompareResult) {
    /**
     * d1 < NOW
     */
    DateCompareResult[DateCompareResult["lt"] = 0] = "lt";
    /**
     * d1 > NOW
     */
    DateCompareResult[DateCompareResult["bt"] = 1] = "bt";
    /**
     * d1 == NOW
     */
    DateCompareResult[DateCompareResult["eq"] = 2] = "eq";
    /**
     * Can't Compare
     */
    DateCompareResult[DateCompareResult["unknown"] = 3] = "unknown";
})(DateCompareResult || (DateCompareResult = {}));
exports.default = BungieOAuthManager;
