"use strict";
// https://github.com/Bungie-net/api/wiki/OAuth-Documentation
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorizationHelper_1 = __importDefault(require("./AuthorizationHelper"));
const TokenHelper_1 = __importDefault(require("./TokenHelper"));
class OAuth {
    constructor(X_API_KEY, isSecret, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        this.X_API_KEY = X_API_KEY;
        this.OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this.OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
        this.isSecret = isSecret;
    }
    get AuthorizationHelper() {
        return new AuthorizationHelper_1.default(this.OAUTH_CLIENT_ID);
    }
    get TokenHelper() {
        return new TokenHelper_1.default(this.isSecret, this.OAUTH_CLIENT_ID, this.OAUTH_CLIENT_SECRET);
    }
}
exports.default = OAuth;
