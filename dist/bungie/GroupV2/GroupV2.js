"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetGroupsForMember_1 = __importDefault(require("./GetGroupsForMember"));
const GetGroup_1 = __importDefault(require("./GetGroup"));
const GetMembersOfGroup_1 = __importDefault(require("./GetMembersOfGroup"));
class GroupV2 {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        this._X_API_KEY = X_API_KEY;
        this._OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this._OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
    }
    get GetGroupsForMember() {
        return new GetGroupsForMember_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get GetGroup() {
        return new GetGroup_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
    get GetMembersOfGroup() {
        return new GetMembersOfGroup_1.default(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
}
exports.default = GroupV2;
