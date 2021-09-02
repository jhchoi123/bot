"use strict";
// https://bungie-net.github.io/multi/operation_get_Destiny2-GetLinkedProfiles.html#operation_get_Destiny2-GetLinkedProfiles
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
class GetLinkedProfiles extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    get membershipType() {
        return BungieMembershipType_1.default;
    }
    execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetLinkedProfiles.METHOD
        };
        let url = GetLinkedProfiles.FULL_URL.replace("{membershipType}", String(options.membershipType))
            .replace("{membershipId}", options.membershipId);
        if (options.getAllMemberships != undefined) {
            url = url + "?getAllMemberships=" + String(options.getAllMemberships);
        }
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
GetLinkedProfiles.PATH = "/Destiny2/{membershipType}/Profile/{membershipId}/LinkedProfiles/";
GetLinkedProfiles.METHOD = "GET";
GetLinkedProfiles.FULL_URL = GetLinkedProfiles.ROOT_PATH + GetLinkedProfiles.PATH;
exports.default = GetLinkedProfiles;
