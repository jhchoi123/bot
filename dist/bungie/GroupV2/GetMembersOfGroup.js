"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
class GetMembersOfGroup extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    async execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetMembersOfGroup.METHOD
        };
        let url = GetMembersOfGroup.FULL_URL.replace("{groupId}", options.groupId);
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
GetMembersOfGroup.PATH = "/GroupV2/{groupId}/Members/";
GetMembersOfGroup.METHOD = "GET";
GetMembersOfGroup.FULL_URL = GetMembersOfGroup.ROOT_PATH + GetMembersOfGroup.PATH;
exports.default = GetMembersOfGroup;
