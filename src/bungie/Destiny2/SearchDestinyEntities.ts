// https://bungie-net.github.io/multi/operation_get_Destiny2-SearchDestinyEntities.html#operation_get_Destiny2-SearchDestinyEntities

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import {DestinyEntitySearchResult} from "../Entities/Destiny/DestinyEntitySearchResult";
import {AbstractResponseData} from "../share/AbstractResponseData";

class SearchDestinyEntities extends AbstractAPIEndpoint {
    public static readonly PATH = "/Destiny2/Armory/Search/{type}/{searchTerm}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = SearchDestinyEntities.ROOT_PATH + SearchDestinyEntities.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    execute(options: SearchOption): Promise<ResponseData> {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: SearchDestinyEntities.METHOD
        };

        let url = SearchDestinyEntities.FULL_URL.replace("{type}", options.type)
            .replace("{searchTerm}", encodeURI(options.searchTerm));

        const qs = new URLSearchParams();

        if (options.page != undefined) {
            qs.append("page", String(options.page));
        }
        if (options.lc != undefined) {
            qs.append("lc", options.lc);
        }

        url = url + "?" + qs.toString();


        const sender: RequestSender = new RequestSender(url, requestOptions);

        return new Promise<ResponseData>((resolve, reject) => {
            sender.json().then(jsonData => {
                const res: ResponseData = jsonData as ResponseData;
                resolve(res);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}

interface SearchOption extends AbstractSearchOption {
    type: string,
    searchTerm: string,
    page?: number
}

interface ResponseData extends AbstractResponseData {
    Response: DestinyEntitySearchResult,
}


export default SearchDestinyEntities;