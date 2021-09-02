"use strict";
// https://bungie-net.github.io/multi/operation_get_Destiny2-SearchDestinyEntities.html#operation_get_Destiny2-SearchDestinyEntities
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
class SearchDestinyEntities extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: SearchDestinyEntities.METHOD
        };
        let url = SearchDestinyEntities.FULL_URL.replace("{type}", options.type)
            .replace("{searchTerm}", encodeURI(options.searchTerm));
        const qs = new URLSearchParams();
        if (options.page != undefined) {
            qs.append("page", String(options.page));
        }
        if (options.lc != undefined) {
            qs.append("lc", options.lc);
        }
        url = url + "?" + qs.toString();
        const sender = new RequestSender_1.default(url, requestOptions);
        return new Promise((resolve, reject) => {
            sender.json().then(jsonData => {
                const res = jsonData;
                resolve(res);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
SearchDestinyEntities.PATH = "/Destiny2/Armory/Search/{type}/{searchTerm}/";
SearchDestinyEntities.METHOD = "GET";
SearchDestinyEntities.FULL_URL = SearchDestinyEntities.ROOT_PATH + SearchDestinyEntities.PATH;
exports.default = SearchDestinyEntities;
