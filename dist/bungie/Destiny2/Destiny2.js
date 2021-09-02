"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetDestinyManifest_1 = __importDefault(require("./GetDestinyManifest"));
const SearchDestinyPlayer_1 = __importDefault(require("./SearchDestinyPlayer"));
const GetProfile_1 = __importDefault(require("./GetProfile"));
const SearchDestinyEntities_1 = __importDefault(require("./SearchDestinyEntities"));
const GetCharacter_1 = __importDefault(require("./GetCharacter"));
const GetItem_1 = __importDefault(require("./GetItem"));
const GetCollectibleNodeDetails_1 = __importDefault(require("./GetCollectibleNodeDetails"));
class Destiny2 {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        this._X_API_KEY = X_API_KEY;
        this._OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this._OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
    }
    get GetDestinyManifest() {
        return new GetDestinyManifest_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get SearchDestinyPlayer() {
        return new SearchDestinyPlayer_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get GetProfile() {
        return new GetProfile_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get SearchDestinyEntities() {
        return new SearchDestinyEntities_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get GetCharacter() {
        return new GetCharacter_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get GetItem() {
        return new GetItem_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get GetCollectibleNodeDetails() {
        return new GetCollectibleNodeDetails_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
}
exports.default = Destiny2;
