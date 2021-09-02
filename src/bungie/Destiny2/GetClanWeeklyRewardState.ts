// https://bungie-net.github.io/multi/operation_get_Destiny2-GetClanWeeklyRewardState.html#operation_get_Destiny2-GetClanWeeklyRewardState

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";

/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetClanWeeklyRewardState extends AbstractAPIEndpoint {
    public static readonly PATH = "/Destiny2/Clan/{groupId}/WeeklyRewardState/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetClanWeeklyRewardState.ROOT_PATH + GetClanWeeklyRewardState.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    execute(options: SearchOption): object {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options?.oAuthToken),
            method: GetClanWeeklyRewardState.METHOD
        };

        const url = GetClanWeeklyRewardState.FULL_URL.replace("{groupId}", options?.groupId)

        const sender: RequestSender = new RequestSender(url, requestOptions);

        return new Promise<object>((resolve, reject) => {
            sender.json().then(jsonData => {
                resolve(jsonData);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}

interface SearchOption extends AbstractSearchOption {
    groupId: string
}

export default GetClanWeeklyRewardState;