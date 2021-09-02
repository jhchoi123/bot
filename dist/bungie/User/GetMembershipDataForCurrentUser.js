"use strict";
// https://bungie-net.github.io/multi/operation_get_User-GetMembershipDataForCurrentUser.html#operation_get_User-GetMembershipDataForCurrentUser
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetMembershipDataForCurrentUser extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    async execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetMembershipDataForCurrentUser.METHOD
        };
        const sender = new RequestSender_1.default(GetMembershipDataForCurrentUser.FULL_URL, requestOptions);
        return new Promise((resolve, reject) => {
            sender.json().then(jsonData => {
                resolve(jsonData);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
GetMembershipDataForCurrentUser.PATH = "/User/GetMembershipsForCurrentUser/";
GetMembershipDataForCurrentUser.METHOD = "GET";
GetMembershipDataForCurrentUser.FULL_URL = GetMembershipDataForCurrentUser.ROOT_PATH + GetMembershipDataForCurrentUser.PATH;
exports.default = GetMembershipDataForCurrentUser;
