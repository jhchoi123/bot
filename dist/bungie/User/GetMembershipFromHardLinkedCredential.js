"use strict";
// https://bungie-net.github.io/multi/operation_get_User-GetMembershipFromHardLinkedCredential.html#operation_get_User-GetMembershipFromHardLinkedCredential
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
const BungieCredentialType_1 = __importDefault(require("../Entities/BungieCredentialType"));
class GetMembershipFromHardLinkedCredential extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    get credentialType() {
        return BungieCredentialType_1.default;
    }
    execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetMembershipFromHardLinkedCredential.METHOD
        };
        const url = GetMembershipFromHardLinkedCredential.FULL_URL.replace("{crType}", String(options.crType))
            .replace("{credential}", options.credential);
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
GetMembershipFromHardLinkedCredential.PATH = "/User/GetMembershipFromHardLinkedCredential/{crType}/{credential}/";
GetMembershipFromHardLinkedCredential.METHOD = "GET";
GetMembershipFromHardLinkedCredential.FULL_URL = GetMembershipFromHardLinkedCredential.ROOT_PATH + GetMembershipFromHardLinkedCredential.PATH;
exports.default = GetMembershipFromHardLinkedCredential;
