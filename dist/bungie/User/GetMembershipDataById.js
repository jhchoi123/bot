"use strict";
// https://bungie-net.github.io/multi/operation_get_User-GetMembershipDataById.html#operation_get_User-GetMembershipDataById
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
const BungieMembershipType_1 = __importDefault(require("../Entities/BungieMembershipType"));
/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetMembershipDataById extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    get membershipType() {
        return BungieMembershipType_1.default;
    }
    execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetMembershipDataById.METHOD
        };
        const url = GetMembershipDataById.FULL_URL.replace("{membershipId}", options.membershipId)
            .replace("{membershipType}", String(options.membershipType));
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
GetMembershipDataById.PATH = "/User/GetMembershipsById/{membershipId}/{membershipType}/";
GetMembershipDataById.METHOD = "GET";
GetMembershipDataById.FULL_URL = GetMembershipDataById.ROOT_PATH + GetMembershipDataById.PATH;
exports.default = GetMembershipDataById;
