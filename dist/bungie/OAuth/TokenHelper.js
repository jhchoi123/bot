"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
const node_fetch_1 = require("node-fetch");
class TokenHelper {
    constructor(isSecret, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        this.OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
        this.isSecret = isSecret;
        this.OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
    }
    getToken(code, authorizationHeader) {
        const body = new URLSearchParams();
        const header = new node_fetch_1.Headers();
        body.append("grant_type", "authorization_code");
        body.append("client_id", String(this.OAUTH_CLIENT_ID));
        body.append("code", code);
        header.append("Content-Type", "application/x-www-form-urlencoded");
        if (this.isSecret) {
            if (this.OAUTH_CLIENT_SECRET == undefined) {
                throw new Error("Secret Client Requires OAuth Client Secret!");
            }
            else {
                body.append("client_secret", this.OAUTH_CLIENT_SECRET);
            }
        }
        else {
            if (authorizationHeader == undefined) {
                throw new Error("Public Client Requires Authorization Header!");
            }
            else {
                header.append("Authorization", `${authorizationHeader.type} ${authorizationHeader.key}`);
            }
        }
        const requestOption = {
            method: TokenHelper.METHOD,
            headers: header,
            body: body.toString()
        };
        const requestSender = new RequestSender_1.default(TokenHelper.FULL_URL, requestOption);
        return new Promise((resolve, reject) => {
            requestSender.json().then(jsonObject => {
                const rawData = jsonObject;
                const data = {
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
    refreshToken(refreshToken, authorizationHeader) {
        const body = new URLSearchParams();
        const header = new node_fetch_1.Headers();
        body.append("grant_type", "refresh_token");
        body.append("client_id", String(this.OAUTH_CLIENT_ID));
        body.append("refresh_token", refreshToken);
        header.append("Content-Type", "application/x-www-form-urlencoded");
        if (this.isSecret) {
            if (this.OAUTH_CLIENT_SECRET == undefined) {
                throw new Error("Secret Client Requires OAuth Client Secret!");
            }
            else {
                body.append("client_secret", this.OAUTH_CLIENT_SECRET);
            }
        }
        else {
            if (authorizationHeader == undefined) {
                throw new Error("Public Client Requires Authorization Header!");
            }
            else {
                header.append("Authorization", `${authorizationHeader.type} ${authorizationHeader.key}`);
            }
        }
        const requestOption = {
            method: TokenHelper.METHOD,
            headers: header,
            body: body.toString()
        };
        const requestSender = new RequestSender_1.default(TokenHelper.FULL_URL, requestOption);
        return new Promise((resolve, reject) => {
            requestSender.json().then(jsonObject => {
                const rawData = jsonObject;
                const data = {
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
TokenHelper.METHOD = "POST";
TokenHelper.FULL_URL = "https://www.bungie.net/platform/app/oauth/token/";
exports.default = TokenHelper;
