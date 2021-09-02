import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import {AbstractResponseData} from "../share/AbstractResponseData";
import {GetGroupsForMemberResponse} from "../Entities/GroupV2/GetGroupsForMemberResponse";
import GroupsForMemberFilter from "../Entities/GroupV2/GroupsForMemberFilter";
import GroupType from "../Entities/GroupV2/GroupType";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";

class GetGroupsForMember extends AbstractAPIEndpoint {
    public static readonly PATH = "/GroupV2/User/{membershipType}/{membershipId}/{filter}/{groupType}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetGroupsForMember.ROOT_PATH + GetGroupsForMember.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    public get filter() {
        return GroupsForMemberFilter;
    }

    public get groupType() {
        return GroupType;
    }

    public async execute(options: SearchOption): Promise<ResponseData> {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetGroupsForMember.METHOD
        };

        let url = GetGroupsForMember.FULL_URL.replace("{membershipType}", String(options.membershipType))
            .replace("{membershipId}", options.membershipId).replace("{filter}", String(options.filter))
            .replace("{groupType}", String(options.groupType));

        const sender = new RequestSender(url, requestOptions);

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
    Response: GetGroupsForMemberResponse
}

interface SearchOption extends AbstractSearchOption {
    filter: number,
    groupType: number,
    membershipId: string,
    membershipType: number
}

export default GetGroupsForMember;