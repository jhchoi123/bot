// https://bungie-net.github.io/multi/operation_get_Destiny2-GetCollectibleNodeDetails.html#operation_get_Destiny2-GetCollectibleNodeDetails

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import DestinyComponentType from "../Entities/Destiny/DestinyComponentType";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import BungieMembershipType from "../Entities/BungieMembershipType";
import {AbstractResponseData} from "../share/AbstractResponseData";
import {DestinyCollectibleNodeDetailResponse} from "../Entities/Destiny/Responses/DestinyCollectibleNodeDetailResponse";

/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetCollectibleNodeDetails extends AbstractAPIEndpoint {
    public static readonly PATH = "/Destiny2/{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/Collectibles/{collectiblePresentationNodeHash}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetCollectibleNodeDetails.ROOT_PATH + GetCollectibleNodeDetails.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    public get components() {
        return DestinyComponentType;
    }

    public get membershipType() {
        return BungieMembershipType;
    }

    async execute(options: SearchOption): Promise<ResponseData> {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetCollectibleNodeDetails.METHOD
        };

        let url = GetCollectibleNodeDetails.FULL_URL.replace("{membershipType}", String(options.membershipType))
                .replace("{destinyMembershipId}", options.destinyMembershipId)
                .replace("{characterId}", options.characterId)
                .replace("{collectiblePresentationNodeHash}", options.collectiblePresentationNodeHash)
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
    Response: DestinyCollectibleNodeDetailResponse
}

interface SearchOption extends AbstractSearchOption {
    characterId: string,
    collectiblePresentationNodeHash: string,
    destinyMembershipId: string,
    membershipType: number,
    components: number[]
}

export default GetCollectibleNodeDetails;