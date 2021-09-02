"use strict";
// https://bungie-net.github.io/multi/operation_get_Destiny2-GetProfile.html#operation_get_Destiny2-GetProfile
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const BungieMembershipType_1 = __importDefault(require("../Entities/BungieMembershipType"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
const DestinyComponentType_1 = __importDefault(require("../Entities/Destiny/DestinyComponentType"));
class GetProfile extends AbstractAPIEndpoint_1.default {
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
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetProfile.METHOD
        };
        let url = GetProfile.FULL_URL.replace("{membershipType}", String(options.membershipType))
            .replace("{destinyMembershipId}", String(options.destinyMembershipId))
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
GetProfile.PATH = "/Destiny2/{membershipType}/Profile/{destinyMembershipId}/";
GetProfile.METHOD = "GET";
GetProfile.FULL_URL = GetProfile.ROOT_PATH + GetProfile.PATH;
exports.default = GetProfile;
