"use strict";
// Bungie API Documentation: https://bungie-net.github.io/multi/index.html
// Bungie API Git Hub: https://github.com/Bungie-net/api
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Destiny2_1 = __importDefault(require("./Destiny2/Destiny2"));
const App_1 = __importDefault(require("./App/App"));
const User_1 = __importDefault(require("./User/User"));
const OAuth_1 = __importDefault(require("./OAuth/OAuth"));
const GroupV2_1 = __importDefault(require("./GroupV2/GroupV2"));
class BungieAPIWrapper {
    constructor(X_API_KEY, isSecret, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        this._X_API_KEY = X_API_KEY;
        this._OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this._OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
        this._isSecret = isSecret;
    }
    get X_API_KEY() {
        return this._X_API_KEY;
    }
    set X_API_KEY(value) {
        this._X_API_KEY = value;
    }
    /** If OAuth Client Id is undefined, Returns 0 */
    get OAUTH_CLIENT_ID() {
        if (this._OAUTH_CLIENT_ID == undefined) {
            return 0;
        }
        else {
            return this._OAUTH_CLIENT_ID;
        }
    }
    set OAUTH_CLIENT_ID(value) {
        this._OAUTH_CLIENT_ID = value;
    }
    /** If OAuth Client Secret is undefined, Returns "" */
    get OAUTH_CLIENT_SECRET() {
        if (this._OAUTH_CLIENT_SECRET == undefined) {
            return "";
        }
        else {
            return this._OAUTH_CLIENT_SECRET;
        }
    }
    /** If You Set OAuth Client Secret, isSecret Will Be true */
    set OAUTH_CLIENT_SECRET(value) {
        this._isSecret = true;
        this._OAUTH_CLIENT_SECRET = value;
    }
    /** If isSecret is undefined, Returns false */
    get isSecret() {
        if (this._isSecret == undefined) {
            return false;
        }
        else {
            return this._isSecret;
        }
    }
    /** If You Set False, OAuth Client Secret Will Be undefined */
    set isSecret(value) {
        this._isSecret = value;
        if (!value) {
            this._OAUTH_CLIENT_SECRET = undefined;
        }
    }
    get Destiny2() {
        return new Destiny2_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get App() {
        return new App_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get User() {
        return new User_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get OAuth() {
        if (this._isSecret == undefined || this._OAUTH_CLIENT_ID == undefined) {
            throw new Error("OAuth Requires isSecret and OAuth Client ID!");
        }
        else {
            return new OAuth_1.default(this._X_API_KEY, this._isSecret, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
        }
    }
    get GroupV2() {
        return new GroupV2_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
}
exports.default = BungieAPIWrapper;
