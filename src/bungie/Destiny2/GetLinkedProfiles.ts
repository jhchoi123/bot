// https://bungie-net.github.io/multi/operation_get_Destiny2-GetLinkedProfiles.html#operation_get_Destiny2-GetLinkedProfiles

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import BungieMembershipType from "../Entities/BungieMembershipType";
import {AbstractSearchOption} from "../share/AbstractSearchOption";

/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetLinkedProfiles extends AbstractAPIEndpoint {
    public static readonly PATH = "/Destiny2/{membershipType}/Profile/{membershipId}/LinkedProfiles/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetLinkedProfiles.ROOT_PATH + GetLinkedProfiles.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    public get membershipType() {
        return BungieMembershipType;
    }

    execute(options: SearchOption): object {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetLinkedProfiles.METHOD
        };

        let url = GetLinkedProfiles.FULL_URL.replace("{membershipType}", String(options.membershipType))
            .replace("{membershipId}", options.membershipId);

        if (options.getAllMemberships != undefined) {
            url = url + "?getAllMemberships=" + String(options.getAllMemberships);
        }

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
    membershipId: string,
    membershipType: number,
    getAllMemberships?: boolean
}

export default GetLinkedProfiles;