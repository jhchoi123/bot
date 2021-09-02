"use strict";
// https://bungie-net.github.io/multi/operation_get_App-GetApplicationApiUsage.html#operation_get_App-GetApplicationApiUsage
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetApplicationApiUsage extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetApplicationApiUsage.METHOD
        };
        const url = GetApplicationApiUsage.FULL_URL.replace("{applicationId}", options.applicationId);
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
GetApplicationApiUsage.PATH = "/App/ApiUsage/{applicationId}/";
GetApplicationApiUsage.METHOD = "GET";
GetApplicationApiUsage.FULL_URL = GetApplicationApiUsage.ROOT_PATH + GetApplicationApiUsage.PATH;
exports.default = GetApplicationApiUsage;
