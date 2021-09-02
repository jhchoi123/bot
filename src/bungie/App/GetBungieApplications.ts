// https://bungie-net.github.io/multi/operation_get_App-GetBungieApplications.html#operation_get_App-GetBungieApplications

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import {AbstractSearchOption} from "../share/AbstractSearchOption";

class GetBungieApplications extends AbstractAPIEndpoint {
    public static readonly PATH = "/App/FirstParty/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetBungieApplications.ROOT_PATH + GetBungieApplications.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    execute(options?: AbstractSearchOption): object {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options?.oAuthToken),
            method: GetBungieApplications.METHOD
        };

        const sender: RequestSender = new RequestSender(GetBungieApplications.FULL_URL, requestOptions);

        return new Promise<object>((resolve, reject) => {
            sender.json().then(jsonData => {
                resolve(jsonData);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}

export default GetBungieApplications;