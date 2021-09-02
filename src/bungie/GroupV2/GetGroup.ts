import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import {AbstractResponseData} from "../share/AbstractResponseData";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import {GroupResponse} from "../Entities/GroupV2/GroupResponse";

class GetGroup extends AbstractAPIEndpoint {
    public static readonly PATH = "/GroupV2/{groupId}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetGroup.ROOT_PATH + GetGroup.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    public async execute(options: SearchOption): Promise<ResponseData> {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: GetGroup.METHOD
        };

        let url = GetGroup.FULL_URL.replace("{groupId}", options.groupId);

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
    Response: GroupResponse
}

interface SearchOption extends AbstractSearchOption {
    groupId: string
}

export default GetGroup;