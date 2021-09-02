"use strict";
// https://bungie-net.github.io/multi/operation_get_Destiny2-GetCharacter.html#operation_get_Destiny2-GetCharacter
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const BungieMembershipType_1 = __importDefault(require("../Entities/BungieMembershipType"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
const DestinyComponentType_1 = __importDefault(require("../Entities/Destiny/DestinyComponentType"));
/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetCharacter extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    get membershipType() {
        return BungieMembershipType_1.default;
    }
    get components() {
        return DestinyComponentType_1.default;
    }
    async execute(options) {
        let requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetCharacter.METHOD
        };
        let url = GetCharacter.FULL_URL.replace("{membershipType}", String(options.membershipType))
            .replace("{destinyMembershipId}", options.destinyMembershipId)
            .replace("{characterId}", options.characterId)
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
GetCharacter.PATH = "/Destiny2/{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/";
GetCharacter.METHOD = "GET";
GetCharacter.FULL_URL = GetCharacter.ROOT_PATH + GetCharacter.PATH;
exports.default = GetCharacter;
