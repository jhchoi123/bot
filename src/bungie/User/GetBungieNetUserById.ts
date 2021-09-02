// https://bungie-net.github.io/multi/operation_get_User-GetBungieNetUserById.html#operation_get_User-GetBungieNetUserById

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import {AbstractResponseData} from "../share/AbstractResponseData";
import {GeneralUser} from "../Entities/User/GeneralUser";

class GetBungieNetUserById extends AbstractAPIEndpoint {
    public static readonly PATH = "/User/GetBungieNetUserById/{id}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetBungieNetUserById.ROOT_PATH + GetBungieNetUserById.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    execute(options: SearchOption): Promise<ResponseData> {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetBungieNetUserById.METHOD
        };

        const url = GetBungieNetUserById.FULL_URL.replace("{id}", options.id);

        const sender: RequestSender = new RequestSender(url, requestOptions);

        return new Promise<ResponseData>((resolve, reject) => {
            sender.json().then(jsonData => {
                resolve(jsonData as ResponseData);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}

interface SearchOption extends AbstractSearchOption {
    id: string
}

interface ResponseData extends AbstractResponseData {
    Response: GeneralUser
}

export default GetBungieNetUserById;