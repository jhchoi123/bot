// https://bungie-net.github.io/multi/operation_get_User-GetMembershipDataForCurrentUser.html#operation_get_User-GetMembershipDataForCurrentUser

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import {AbstractResponseData} from "../share/AbstractResponseData";
import {UserMembershipData} from "../Entities/User/UserMembershipData";

/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetMembershipDataForCurrentUser extends AbstractAPIEndpoint {
    public static readonly PATH = "/User/GetMembershipsForCurrentUser/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetMembershipDataForCurrentUser.ROOT_PATH + GetMembershipDataForCurrentUser.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    async execute(options: AbstractSearchOption): Promise<ResponseData> {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetMembershipDataForCurrentUser.METHOD
        };

        const sender: RequestSender = new RequestSender(GetMembershipDataForCurrentUser.FULL_URL, requestOptions);

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
    Response: UserMembershipData
}

export default GetMembershipDataForCurrentUser;