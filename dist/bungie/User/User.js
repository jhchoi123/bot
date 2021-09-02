"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetBungieNetUserById_1 = __importDefault(require("./GetBungieNetUserById"));
const SearchUsers_1 = __importDefault(require("./SearchUsers"));
const GetCredentialTypesForTargetAccount_1 = __importDefault(require("./GetCredentialTypesForTargetAccount"));
const GetAvailableThemes_1 = __importDefault(require("./GetAvailableThemes"));
const GetMembershipDataById_1 = __importDefault(require("./GetMembershipDataById"));
const GetMembershipDataForCurrentUser_1 = __importDefault(require("./GetMembershipDataForCurrentUser"));
const GetMembershipFromHardLinkedCredential_1 = __importDefault(require("./GetMembershipFromHardLinkedCredential"));
class User {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        this._X_API_KEY = X_API_KEY;
        this._OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this._OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
    }
    get GetBungieNetUserById() {
        return new GetBungieNetUserById_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get SearchUsers() {
        return new SearchUsers_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get GetCredentialTypesForTargetAccount() {
        return new GetCredentialTypesForTargetAccount_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get GetAvailableThemes() {
        return new GetAvailableThemes_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get GetMembershipDataById() {
        return new GetMembershipDataById_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get GetMembershipDataForCurrentUser() {
        return new GetMembershipDataForCurrentUser_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get GetMembershipFromHardLinkedCredential() {
        return new GetMembershipFromHardLinkedCredential_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
}
exports.default = User;
