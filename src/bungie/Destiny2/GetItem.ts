// https://bungie-net.github.io/multi/operation_get_Destiny2-GetItem.html#operation_get_Destiny2-GetItem

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import BungieMembershipType from "../Entities/BungieMembershipType";
import DestinyComponentType from "../Entities/Destiny/DestinyComponentType";
import {AbstractResponseData} from "../share/AbstractResponseData";
import {DestinyItemResponse} from "../Entities/Destiny/Responses/DestinyItemResponse";


/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetItem extends AbstractAPIEndpoint {
    public static readonly PATH = "/Destiny2/{membershipType}/Profile/{destinyMembershipId}/Item/{itemInstanceId}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetItem.ROOT_PATH + GetItem.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    public get membershipType() {
        return BungieMembershipType;
    }

    public get components() {
        return DestinyComponentType;
    }

    execute(options: SearchOption): Promise<ResponseData> {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options?.oAuthToken),
            method: GetItem.METHOD
        };

        let url = GetItem.FULL_URL.replace("{membershipType}", String(options.membershipType))
                .replace("{destinyMembershipId}", options.destinyMembershipId)
                .replace("{itemInstanceId}", options.itemInstanceId)
            + "?components=";

        for (const component of options.components) {
            url = url + String(component) + ",";
        }

        url = url.substring(0, url.length - 1);

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

interface ResponseData extends AbstractResponseData {
    Response: DestinyItemResponse
}

interface SearchOption extends AbstractSearchOption {
    membershipType: number,
    destinyMembershipId: string,
    itemInstanceId: string,
    components: number[]
}

export default GetItem;