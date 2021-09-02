"use strict";
// https://bungie-net.github.io/multi/operation_get_Destiny2-GetDestinyEntityDefinition.html#operation_get_Destiny2-GetDestinyEntityDefinition
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetDestinyEntityDefinition extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options?.oAuthToken),
            method: GetDestinyEntityDefinition.METHOD
        };
        const url = GetDestinyEntityDefinition.FULL_URL.replace("{entityType}", options.entityType)
            .replace("{hashIdentifier}", options.hashIdentifier);
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
GetDestinyEntityDefinition.PATH = "/Destiny2/Manifest/{entityType}/{hashIdentifier}/";
GetDestinyEntityDefinition.METHOD = "GET";
GetDestinyEntityDefinition.FULL_URL = GetDestinyEntityDefinition.ROOT_PATH + GetDestinyEntityDefinition.PATH;
exports.default = GetDestinyEntityDefinition;
