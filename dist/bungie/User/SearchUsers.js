"use strict";
// https://bungie-net.github.io/multi/operation_get_User-SearchUsers.html#operation_get_User-SearchUsers
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
class SearchUsers extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: SearchUsers.METHOD
        };
        const sender = new RequestSender_1.default(SearchUsers.FULL_URL + "?q=" + options.searchString, requestOptions);
        return new Promise((resolve, reject) => {
            sender.json().then(jsonData => {
                resolve(jsonData);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
SearchUsers.PATH = "/User/SearchUsers/";
SearchUsers.METHOD = "GET";
SearchUsers.FULL_URL = SearchUsers.ROOT_PATH + SearchUsers.PATH;
exports.default = SearchUsers;
