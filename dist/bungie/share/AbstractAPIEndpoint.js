"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
class AbstractAPIEndpoint {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        this._X_API_KEY = X_API_KEY;
        this._OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this._OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
    }
    get X_API_KEY() {
        return this._X_API_KEY;
    }
    get OAUTH_CLIENT_ID() {
        return this._OAUTH_CLIENT_ID;
    }
    get OAUTH_CLIENT_SECRET() {
        return this._OAUTH_CLIENT_SECRET;
    }
    createHeaders(oAuthToken) {
        const headers = new node_fetch_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("X-API-Key", this._X_API_KEY);
        if (oAuthToken != undefined) {
            headers.append("Authorization", `Bearer ${oAuthToken}`);
        }
        return headers;
    }
}
AbstractAPIEndpoint.ROOT_PATH = "https://www.bungie.net/Platform";
exports.default = AbstractAPIEndpoint;
