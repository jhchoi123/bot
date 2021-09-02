// https://bungie-net.github.io/multi/operation_get_Destiny2-GetProfile.html#operation_get_Destiny2-GetProfile

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import BungieMembershipType from "../Entities/BungieMembershipType";
import RequestSender from "../share/RequestSender";
import DestinyComponentType from "../Entities/Destiny/DestinyComponentType";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import {AbstractResponseData} from "../share/AbstractResponseData";
import {DestinyProfileResponse} from "../Entities/Destiny/Responses/DestinyProfileResponse";

class GetProfile extends AbstractAPIEndpoint {
    public static readonly PATH = "/Destiny2/{membershipType}/Profile/{destinyMembershipId}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetProfile.ROOT_PATH + GetProfile.PATH;

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
        const requestOptions = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetProfile.METHOD
        }

        let url = GetProfile.FULL_URL.replace("{membershipType}", String(options.membershipType))
                .replace("{destinyMembershipId}", String(options.destinyMembershipId))
            + "?components=";

        for (const component of options.components) {
            url = url + String(component) + ",";
        }

        url = url.substring(0, url.length - 1);

        const sender: RequestSender
            = new RequestSender(url, requestOptions);

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
    Response: DestinyProfileResponse
}

interface SearchOption extends AbstractSearchOption {
    membershipType: number,
    destinyMembershipId: string,
    components: number[]
}

export default GetProfile;