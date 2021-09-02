"use strict";
// https://bungie-net.github.io/multi/operation_get_Destiny2-GetCollectibleNodeDetails.html#operation_get_Destiny2-GetCollectibleNodeDetails
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const DestinyComponentType_1 = __importDefault(require("../Entities/Destiny/DestinyComponentType"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
const BungieMembershipType_1 = __importDefault(require("../Entities/BungieMembershipType"));
/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetCollectibleNodeDetails extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    get components() {
        return DestinyComponentType_1.default;
    }
    get membershipType() {
        return BungieMembershipType_1.default;
    }
    async execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetCollectibleNodeDetails.METHOD
        };
        let url = GetCollectibleNodeDetails.FULL_URL.replace("{membershipType}", String(options.membershipType))
            .replace("{destinyMembershipId}", options.destinyMembershipId)
            .replace("{characterId}", options.characterId)
            .replace("{collectiblePresentationNodeHash}", options.collectiblePresentationNodeHash)
            + "?components=";
        for (const component of options.components) {
            url = url + String(component) + ",";
        }
        url = url.substring(0, url.length - 1);
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
GetCollectibleNodeDetails.PATH = "/Destiny2/{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/Collectibles/{collectiblePresentationNodeHash}/";
GetCollectibleNodeDetails.METHOD = "GET";
GetCollectibleNodeDetails.FULL_URL = GetCollectibleNodeDetails.ROOT_PATH + GetCollectibleNodeDetails.PATH;
exports.default = GetCollectibleNodeDetails;
