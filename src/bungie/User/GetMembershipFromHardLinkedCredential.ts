// https://bungie-net.github.io/multi/operation_get_User-GetMembershipFromHardLinkedCredential.html#operation_get_User-GetMembershipFromHardLinkedCredential

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import BungieCredentialType from "../Entities/BungieCredentialType";
import {AbstractSearchOption} from "../share/AbstractSearchOption";

class GetMembershipFromHardLinkedCredential extends AbstractAPIEndpoint {
    public static readonly PATH = "/User/GetMembershipFromHardLinkedCredential/{crType}/{credential}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetMembershipFromHardLinkedCredential.ROOT_PATH + GetMembershipFromHardLinkedCredential.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    public get credentialType() {
        return BungieCredentialType;
    }

    execute(options: SearchOption): object {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetMembershipFromHardLinkedCredential.METHOD
        };

        const url = GetMembershipFromHardLinkedCredential.FULL_URL.replace("{crType}", String(options.crType))
            .replace("{credential}", options.credential);

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
    crType: number,
    credential: string
}

export default GetMembershipFromHardLinkedCredential;