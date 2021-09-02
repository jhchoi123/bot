"use strict";
// https://bungie-net.github.io/multi/operation_get_Destiny2-GetDestinyManifest.html#operation_get_Destiny2-GetDestinyManifest
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
class GetDestinyManifest extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    async execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options?.oAuthToken),
            method: GetDestinyManifest.METHOD
        };
        const sender = new RequestSender_1.default(GetDestinyManifest.FULL_URL, requestOptions);
        return new Promise((resolve, reject) => {
            sender.json().then(jsonData => {
                resolve(jsonData);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
GetDestinyManifest.PATH = "/Destiny2/Manifest/";
GetDestinyManifest.METHOD = "GET";
GetDestinyManifest.FULL_URL = GetDestinyManifest.ROOT_PATH + GetDestinyManifest.PATH;
exports.default = GetDestinyManifest;
