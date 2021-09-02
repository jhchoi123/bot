// https://bungie-net.github.io/multi/operation_get_Destiny2-GetCharacter.html#operation_get_Destiny2-GetCharacter

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import BungieMembershipType from "../Entities/BungieMembershipType";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import DestinyComponentType from "../Entities/Destiny/DestinyComponentType";
import {AbstractResponseData} from "../share/AbstractResponseData";
import {DestinyCharacterResponse} from "../Entities/Destiny/Responses/DestinyCharacterResponse";

/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetCharacter extends AbstractAPIEndpoint {
    public static readonly PATH = "/Destiny2/{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetCharacter.ROOT_PATH + GetCharacter.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    public get membershipType() {
        return BungieMembershipType;
    }

    public get components() {
        return DestinyComponentType;
    }

    async execute(options: SearchOption): Promise<ResponseData> {
        let requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetCharacter.METHOD
        };

        let url = GetCharacter.FULL_URL.replace("{membershipType}", String(options.membershipType))
                .replace("{destinyMembershipId}", options.destinyMembershipId)
                .replace("{characterId}", options.characterId)
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
    Response: DestinyCharacterResponse
}

interface SearchOption extends AbstractSearchOption {
    destinyMembershipId: string,
    membershipType: number,
    characterId: string,
    components: number[]
}

export default GetCharacter;