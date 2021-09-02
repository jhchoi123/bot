// https://bungie-net.github.io/multi/operation_get_User-SearchUsers.html#operation_get_User-SearchUsers

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import {AbstractSearchOption} from "../share/AbstractSearchOption";

class SearchUsers extends AbstractAPIEndpoint {
    public static readonly PATH = "/User/SearchUsers/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = SearchUsers.ROOT_PATH + SearchUsers.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    execute(options: SearchOption): object {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: SearchUsers.METHOD
        };

        const sender: RequestSender = new RequestSender(SearchUsers.FULL_URL + "?q=" + options.searchString, requestOptions);

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
    searchString: string
}

export default SearchUsers;