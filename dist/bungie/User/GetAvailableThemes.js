"use strict";
// https://bungie-net.github.io/multi/operation_get_User-GetAvailableThemes.html#operation_get_User-GetAvailableThemes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
class GetAvailableThemes extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options?.oAuthToken),
            method: GetAvailableThemes.METHOD
        };
        const sender = new RequestSender_1.default(GetAvailableThemes.FULL_URL, requestOptions);
        return new Promise((resolve, reject) => {
            sender.json().then(jsonData => {
                resolve(jsonData);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
GetAvailableThemes.PATH = "/User/GetAvailableThemes/";
GetAvailableThemes.METHOD = "GET";
GetAvailableThemes.FULL_URL = GetAvailableThemes.ROOT_PATH + GetAvailableThemes.PATH;
exports.default = GetAvailableThemes;
