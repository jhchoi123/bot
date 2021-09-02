"use strict";
// https://bungie-net.github.io/multi/operation_get_User-GetCredentialTypesForTargetAccount.html#operation_get_User-GetCredentialTypesForTargetAccount
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
/**
 *  This Endpoint Implementation Not Tested Yet
 *  I think this Endpoint Required oAuth Token
 */
class GetCredentialTypesForTargetAccount extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetCredentialTypesForTargetAccount.METHOD
        };
        const url = GetCredentialTypesForTargetAccount.FULL_URL.replace("{membershipId}", options.membershipId);
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
GetCredentialTypesForTargetAccount.PATH = "/User/GetCredentialTypesForTargetAccount/{membershipId}/";
GetCredentialTypesForTargetAccount.METHOD = "GET";
GetCredentialTypesForTargetAccount.FULL_URL = GetCredentialTypesForTargetAccount.ROOT_PATH + GetCredentialTypesForTargetAccount.PATH;
exports.default = GetCredentialTypesForTargetAccount;
