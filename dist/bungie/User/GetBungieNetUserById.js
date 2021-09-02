"use strict";
// https://bungie-net.github.io/multi/operation_get_User-GetBungieNetUserById.html#operation_get_User-GetBungieNetUserById
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
class GetBungieNetUserById extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetBungieNetUserById.METHOD
        };
        const url = GetBungieNetUserById.FULL_URL.replace("{id}", options.id);
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
GetBungieNetUserById.PATH = "/User/GetBungieNetUserById/{id}/";
GetBungieNetUserById.METHOD = "GET";
GetBungieNetUserById.FULL_URL = GetBungieNetUserById.ROOT_PATH + GetBungieNetUserById.PATH;
exports.default = GetBungieNetUserById;
