"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const GroupsForMemberFilter_1 = __importDefault(require("../Entities/GroupV2/GroupsForMemberFilter"));
const GroupType_1 = __importDefault(require("../Entities/GroupV2/GroupType"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
class GetGroupsForMember extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    get filter() {
        return GroupsForMemberFilter_1.default;
    }
    get groupType() {
        return GroupType_1.default;
    }
    async execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetGroupsForMember.METHOD
        };
        let url = GetGroupsForMember.FULL_URL.replace("{membershipType}", String(options.membershipType))
            .replace("{membershipId}", options.membershipId).replace("{filter}", String(options.filter))
            .replace("{groupType}", String(options.groupType));
        const sender = new RequestSender_1.default(url, requestOptions);
        return new Promise((resolve, reject) => {
            sender.json().then(jsonData => {
                resolve(jsonData);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
GetGroupsForMember.PATH = "/GroupV2/User/{membershipType}/{membershipId}/{filter}/{groupType}/";
GetGroupsForMember.METHOD = "GET";
GetGroupsForMember.FULL_URL = GetGroupsForMember.ROOT_PATH + GetGroupsForMember.PATH;
exports.default = GetGroupsForMember;
