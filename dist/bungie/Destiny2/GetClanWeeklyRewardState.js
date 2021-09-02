"use strict";
// https://bungie-net.github.io/multi/operation_get_Destiny2-GetClanWeeklyRewardState.html#operation_get_Destiny2-GetClanWeeklyRewardState
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAPIEndpoint_1 = __importDefault(require("../share/AbstractAPIEndpoint"));
const RequestSender_1 = __importDefault(require("../share/RequestSender"));
/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetClanWeeklyRewardState extends AbstractAPIEndpoint_1.default {
    constructor(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }
    execute(options) {
        const requestOptions = {
            headers: this.createHeaders(options?.oAuthToken),
            method: GetClanWeeklyRewardState.METHOD
        };
        const url = GetClanWeeklyRewardState.FULL_URL.replace("{groupId}", options?.groupId);
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
GetClanWeeklyRewardState.PATH = "/Destiny2/Clan/{groupId}/WeeklyRewardState/";
GetClanWeeklyRewardState.METHOD = "GET";
GetClanWeeklyRewardState.FULL_URL = GetClanWeeklyRewardState.ROOT_PATH + GetClanWeeklyRewardState.PATH;
exports.default = GetClanWeeklyRewardState;
