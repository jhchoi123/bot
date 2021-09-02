"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthorizationHelper {
    constructor(oAuthClientId) {
        this.clientId = oAuthClientId;
    }
    generateState() {
        return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    }
    createAuthorizationUrl(state, redirectUri) {
        const qs = new URLSearchParams({
            client_id: String(this.clientId),
            response_type: "code",
            state: state
        });
        if (redirectUri != undefined) {
            qs.append("redirect_uri", redirectUri);
        }
        return AuthorizationHelper.FULL_URL + "?" + qs.toString();
    }
}
AuthorizationHelper.METHOD = "GET";
AuthorizationHelper.FULL_URL = "https://www.bungie.net/en/oauth/authorize";
exports.default = AuthorizationHelper;
