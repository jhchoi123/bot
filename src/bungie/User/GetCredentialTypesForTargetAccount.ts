// https://bungie-net.github.io/multi/operation_get_User-GetCredentialTypesForTargetAccount.html#operation_get_User-GetCredentialTypesForTargetAccount

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import {AbstractSearchOption} from "../share/AbstractSearchOption";

/**
 *  This Endpoint Implementation Not Tested Yet
 *  I think this Endpoint Required oAuth Token
 */
class GetCredentialTypesForTargetAccount extends AbstractAPIEndpoint {
    public static readonly PATH = "/User/GetCredentialTypesForTargetAccount/{membershipId}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetCredentialTypesForTargetAccount.ROOT_PATH + GetCredentialTypesForTargetAccount.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    execute(options: SearchOption): object {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetCredentialTypesForTargetAccount.METHOD
        };

        const url = GetCredentialTypesForTargetAccount.FULL_URL.replace("{membershipId}", options.membershipId);

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
    membershipId: string
}

export default GetCredentialTypesForTargetAccount;