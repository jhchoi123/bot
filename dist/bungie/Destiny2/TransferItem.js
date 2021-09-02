"use strict";
// https://bungie-net.github.io/multi/operation_post_Destiny2-TransferItem.html#operation_post_Destiny2-TransferItem
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
const BungieMembershipType_1 = __importDefault(require("../Entities/BungieMembershipType"));
/**
 *  This Endpoint Implementation Not Tested Yet
 */
class TransferItem extends AbstractAPIEndpoint_1.default {
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
            transferToVault: options.transferToVault,
            itemId: options.itemId,
            characterId: options.characterId,
            membershipType: options.membershipType
        };
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: TransferItem.METHOD,
            body: JSON.stringify(bodyData)
        };
        const sender = new RequestSender_1.default(TransferItem.FULL_URL, requestOptions);
        return new Promise((resolve, reject) => {
            sender.json().then(jsonData => {
                resolve(jsonData);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
TransferItem.PATH = "/Destiny2/Actions/Items/TransferItem/";
TransferItem.METHOD = "POST";
TransferItem.FULL_URL = TransferItem.ROOT_PATH + TransferItem.PATH;
exports.default = TransferItem;
