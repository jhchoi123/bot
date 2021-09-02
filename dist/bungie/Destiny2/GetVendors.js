"use strict";
// https://bungie-net.github.io/multi/operation_get_Destiny2-GetVendors.html#operation_get_Destiny2-GetVendors
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
const BungieMembershipType_1 = __importDefault(require("../Entities/BungieMembershipType"));
const DestinyVendorFilter_1 = __importDefault(require("../Entities/Destiny/DestinyVendorFilter"));
const DestinyComponentType_1 = __importDefault(require("../Entities/Destiny/DestinyComponentType"));
/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetVendors extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    get membershipType() {
        return BungieMembershipType_1.default;
    }
    get filter() {
        return DestinyVendorFilter_1.default;
    }
    get component() {
        return DestinyComponentType_1.default;
    }
    execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options?.oAuthToken),
            method: GetVendors.METHOD
        };
        let url = GetVendors.FULL_URL.replace("{membershipType}", String(options.membershipType))
            .replace("{destinyMembershipId}", options.destinyMembershipId)
            .replace("{characterId}", options.characterId)
            + "?components=";
        for (const component of options.components) {
            url = `${url}${String(component)},`;
        }
        url = url.substring(0, url.length - 1);
        if (options.filter != undefined) {
            url = url + "&filter=" + String(options.filter);
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
GetVendors.PATH = "/Destiny2/{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/Vendors/";
GetVendors.METHOD = "GET";
GetVendors.FULL_URL = GetVendors.ROOT_PATH + GetVendors.PATH;
