// https://bungie-net.github.io/multi/operation_get_App-GetApplicationApiUsage.html#operation_get_App-GetApplicationApiUsage

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import {AbstractSearchOption} from "../share/AbstractSearchOption";

/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetApplicationApiUsage extends AbstractAPIEndpoint {
    public static readonly PATH = "/App/ApiUsage/{applicationId}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetApplicationApiUsage.ROOT_PATH + GetApplicationApiUsage.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    execute(options: SearchOption): object {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetApplicationApiUsage.METHOD
        };

        const url = GetApplicationApiUsage.FULL_URL.replace("{applicationId}", options.applicationId);

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
    applicationId: string
}

export default GetApplicationApiUsage;