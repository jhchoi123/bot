// https://bungie-net.github.io/multi/operation_get_User-GetMembershipDataById.html#operation_get_User-GetMembershipDataById

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import BungieMembershipType from "../Entities/BungieMembershipType";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import {AbstractResponseData} from "../share/AbstractResponseData";
import {UserMembershipData} from "../Entities/User/UserMembershipData";

/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetMembershipDataById extends AbstractAPIEndpoint {
    public static readonly PATH = "/User/GetMembershipsById/{membershipId}/{membershipType}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetMembershipDataById.ROOT_PATH + GetMembershipDataById.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    public get membershipType() {
        return BungieMembershipType;
    }

    execute(options: SearchOption): Promise<ResponseData> {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetMembershipDataById.METHOD
        };

        const url = GetMembershipDataById.FULL_URL.replace("{membershipId}", options.membershipId)
            .replace("{membershipType}", String(options.membershipType));

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
    membershipId: string,
    membershipType: number
}

interface ResponseData extends AbstractResponseData {
    Response: UserMembershipData
}

export default GetMembershipDataById;