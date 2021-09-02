// https://bungie-net.github.io/multi/operation_get_Destiny2-GetVendor.html#operation_get_Destiny2-GetVendor

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import DestinyComponentType from "../Entities/Destiny/DestinyComponentType";

/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetVendor extends AbstractAPIEndpoint {
    public static readonly PATH = "/Destiny2/{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/Vendors/{vendorHash}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetVendor.ROOT_PATH + GetVendor.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    public get components() {
        return DestinyComponentType;
    }

    execute(options: SearchOption): object {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetVendor.METHOD
        };

        let url = GetVendor.FULL_URL.replace("{membershipType}", String(options.membershipType))
                .replace("{destinyMembershipId}", options.destinyMembershipId)
                .replace("{characterId}", options.characterId)
                .replace("{vendorHash}", options.vendorHash)
            + "?components=";

        for (const component of options.components) {
            url = url + String(component) + ",";
        }

        url = url.substring(0, url.length - 1);

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
    membershipType: number,
    destinyMembershipId: string,
    characterId: string,
    vendorHash: string,
    components: number[]
}

export default GetVendor;