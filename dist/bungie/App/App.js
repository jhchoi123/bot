"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetBungieApplications_1 = __importDefault(require("./GetBungieApplications"));
const GetApplicationApiUsage_1 = __importDefault(require("./GetApplicationApiUsage"));
class App {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        this._X_API_KEY = X_API_KEY;
        this._OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this._OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
    }
    get GetBungieApplications() {
        return new GetBungieApplications_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get GetApplicationApiUsage() {
        return new GetApplicationApiUsage_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
}
exports.default = App;
