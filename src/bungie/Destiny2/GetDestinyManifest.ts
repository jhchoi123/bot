// https://bungie-net.github.io/multi/operation_get_Destiny2-GetDestinyManifest.html#operation_get_Destiny2-GetDestinyManifest

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import {DestinyManifest} from "../Entities/Destiny/Config/DestinyManifest";
import {AbstractResponseData} from "../share/AbstractResponseData";
import {StringDictionary} from "../share/Dictionary";

class GetDestinyManifest extends AbstractAPIEndpoint {
    public static readonly PATH = "/Destiny2/Manifest/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetDestinyManifest.ROOT_PATH + GetDestinyManifest.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    async execute(options?: AbstractSearchOption): Promise<ResponseData> {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options?.oAuthToken),
            method: GetDestinyManifest.METHOD
        };

        const sender: RequestSender = new RequestSender(GetDestinyManifest.FULL_URL, requestOptions);

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
    Response: StringDictionary<DestinyManifest>
}

export default GetDestinyManifest;