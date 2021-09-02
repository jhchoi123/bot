"use strict";
// https://bungie-net.github.io/multi/operation_get_Destiny2-SearchDestinyPlayer.html#operation_get_Destiny2-SearchDestinyPlayer
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
const BungieMembershipType_1 = __importDefault(require("../Entities/BungieMembershipType"));
class SearchDestinyPlayer extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    get membershipType() {
        return BungieMembershipType_1.default;
    }
    execute(options) {
        let requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: SearchDestinyPlayer.METHOD
        };
        let url = SearchDestinyPlayer.FULL_URL.replace("{membershipType}", String(options.membershipType))
            .replace("{displayName}", options.displayName);
        if (options.returnOriginalProfile != undefined) {
            url = url + "?returnOriginalProfile=" + String(options.returnOriginalProfile);
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
SearchDestinyPlayer.PATH = "/Destiny2/SearchDestinyPlayer/{membershipType}/{displayName}/";
SearchDestinyPlayer.METHOD = "GET";
SearchDestinyPlayer.FULL_URL = SearchDestinyPlayer.ROOT_PATH + SearchDestinyPlayer.PATH;
exports.default = SearchDestinyPlayer;
