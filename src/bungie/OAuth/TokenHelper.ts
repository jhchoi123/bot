import RequestSender from "../share/RequestSender";
import {Headers, RequestInit} from "node-fetch";

class TokenHelper {
    public static readonly METHOD = "POST";
    public static readonly FULL_URL = "https://www.bungie.net/platform/app/oauth/token/";
    private readonly OAUTH_CLIENT_SECRET: string | undefined;
    private readonly OAUTH_CLIENT_ID: number;
    private readonly isSecret: boolean;

    public constructor(isSecret: boolean, OAUTH_CLIENT_ID: number, OAUTH_CLIENT_SECRET?: string) {
        this.OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
        this.isSecret = isSecret;
        this.OAUTH_CLIENT_ID = OAUTH_CLIENT_ID
    }

    public getToken(code: string, authorizationHeader?: AuthorizationHeader): Promise<TokenResponse> {
        const body = new URLSearchParams();
        const header = new Headers();

        body.append("grant_type", "authorization_code");
        body.append("client_id", String(this.OAUTH_CLIENT_ID));
        body.append("code", code);
        header.append("Content-Type", "application/x-www-form-urlencoded");

        if (this.isSecret) {
            if (this.OAUTH_CLIENT_SECRET == undefined) {
                throw new Error("Secret Client Requires OAuth Client Secret!");
            } else {
                body.append("client_secret", this.OAUTH_CLIENT_SECRET);
            }
        } else {
            if (authorizationHeader == undefined) {
                throw new Error("Public Client Requires Authorization Header!");
            } else {
                header.append("Authorization", `${authorizationHeader.type} ${authorizationHeader.key}`);
            }
        }

        const requestOption: RequestInit = {
            method: TokenHelper.METHOD,
            headers: header,
            body: body.toString()
        };

        const requestSender = new RequestSender(TokenHelper.FULL_URL, requestOption);

        return new Promise<any>((resolve, reject) => {
            requestSender.json().then(jsonObject => {
                const rawData: RawTokenResponse = jsonObject as RawTokenResponse;
                const data: TokenResponse = {
                    accessToken: rawData.access_token,
                    tokenType: rawData.token_type,
                    expiresIn: rawData.expires_in,
                    refreshToken: rawData.refresh_token,
                    refreshExpiresIn: rawData.refresh_expires_in,
                    membershipId: rawData.membership_id
                };

                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });

    }

    public refreshToken(refreshToken: string, authorizationHeader?: AuthorizationHeader): Promise<TokenResponse> {
        const body = new URLSearchParams();
        const header = new Headers();

        body.append("grant_type", "refresh_token");
        body.append("client_id", String(this.OAUTH_CLIENT_ID));
        body.append("refresh_token", refreshToken);
        header.append("Content-Type", "application/x-www-form-urlencoded");

        if (this.isSecret) {
            if (this.OAUTH_CLIENT_SECRET == undefined) {
                throw new Error("Secret Client Requires OAuth Client Secret!");
            } else {
                body.append("client_secret", this.OAUTH_CLIENT_SECRET);
            }
        } else {
            if (authorizationHeader == undefined) {
                throw new Error("Public Client Requires Authorization Header!");
            } else {
                header.append("Authorization", `${authorizationHeader.type} ${authorizationHeader.key}`);
            }
        }

        const requestOption: RequestInit = {
            method: TokenHelper.METHOD,
            headers: header,
            body: body.toString()
        };

        const requestSender = new RequestSender(TokenHelper.FULL_URL, requestOption);

        return new Promise<any>((resolve, reject) => {
            requestSender.json().then(jsonObject => {
                const rawData: RawTokenResponse = jsonObject as RawTokenResponse;
                const data: TokenResponse = {
                    accessToken: rawData.access_token,
                    tokenType: rawData.token_type,
                    expiresIn: rawData.expires_in,
                    refreshToken: rawData.refresh_token,
                    refreshExpiresIn: rawData.refresh_expires_in,
                    membershipId: rawData.membership_id
                };

                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

interface TokenResponse {
    accessToken: string,
    tokenType: string,
    expiresIn: number,
    refreshToken: string,
    refreshExpiresIn: number,
    membershipId: string
}

interface RawTokenResponse {
    access_token: string,
    token_type: string,
    expires_in: number,
    refresh_token: string,
    refresh_expires_in: number,
    membership_id: string
}

interface AuthorizationHeader {
    type: string,
    key: string
}

export default TokenHelper;