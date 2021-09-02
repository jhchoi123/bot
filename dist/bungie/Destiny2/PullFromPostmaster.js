"use strict";
// https://bungie-net.github.io/multi/operation_post_Destiny2-PullFromPostmaster.html#operation_post_Destiny2-PullFromPostmaster
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const BungieMembershipType_1 = __importDefault(require("../Entities/BungieMembershipType"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
/**
 *  This Endpoint Implementation Not Tested Yet
 */
class PullFromPostmaster extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    get membershipType() {
        return BungieMembershipType_1.default;
    }
    execute(options) {
        const bodyData = {
            itemReferenceHash: options.itemReferenceHash,
            stackSize: options.stackSize,
            itemId: options.itemId,
            characterId: options.characterId,
            membershipType: options.membershipType
        };
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: PullFromPostmaster.METHOD,
            body: JSON.stringify(bodyData)
        };
        const sender = new RequestSender_1.default(PullFromPostmaster.FULL_URL, requestOptions);
        return new Promise((resolve, reject) => {
            sender.json().then(jsonData => {
                resolve(jsonData);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
PullFromPostmaster.PATH = "/Destiny2/Actions/Items/PullFromPostmaster/";
PullFromPostmaster.METHOD = "POST";
PullFromPostmaster.FULL_URL = PullFromPostmaster.ROOT_PATH + PullFromPostmaster.PATH;
