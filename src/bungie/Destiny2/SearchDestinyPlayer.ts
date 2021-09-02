// https://bungie-net.github.io/multi/operation_get_Destiny2-SearchDestinyPlayer.html#operation_get_Destiny2-SearchDestinyPlayer

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import BungieMembershipType from "../Entities/BungieMembershipType";
import {AbstractSearchOption} from "../share/AbstractSearchOption";

class SearchDestinyPlayer extends AbstractAPIEndpoint {
    public static readonly PATH = "/Destiny2/SearchDestinyPlayer/{membershipType}/{displayName}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = SearchDestinyPlayer.ROOT_PATH + SearchDestinyPlayer.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    public get membershipType() {
        return BungieMembershipType;
    }

    public execute(options: SearchOption): object {
        let requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: SearchDestinyPlayer.METHOD
        };

        let url = SearchDestinyPlayer.FULL_URL.replace("{membershipType}", String(options.membershipType))
            .replace("{displayName}", options.displayName);

        if (options.returnOriginalProfile != undefined) {
            url = url + "?returnOriginalProfile=" + String(options.returnOriginalProfile);
        }

        const sender: RequestSender
            = new RequestSender(url, requestOptions);

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
    displayName: string,
    membershipType: number,
    returnOriginalProfile?: boolean
}


export default SearchDestinyPlayer;