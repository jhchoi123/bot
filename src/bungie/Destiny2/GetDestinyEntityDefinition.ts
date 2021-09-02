// https://bungie-net.github.io/multi/operation_get_Destiny2-GetDestinyEntityDefinition.html#operation_get_Destiny2-GetDestinyEntityDefinition

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";

/**
 *  This Endpoint Implementation Not Tested Yet
 */
class GetDestinyEntityDefinition extends AbstractAPIEndpoint {
    public static readonly PATH = "/Destiny2/Manifest/{entityType}/{hashIdentifier}/";
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = GetDestinyEntityDefinition.ROOT_PATH + GetDestinyEntityDefinition.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    execute(options: SearchOption): object {
        const requestOptions: RequestInit = {
            headers: this.createHeaders(options?.oAuthToken),
            method: GetDestinyEntityDefinition.METHOD
        };

        const url = GetDestinyEntityDefinition.FULL_URL.replace("{entityType}", options.entityType)
            .replace("{hashIdentifier}", options.hashIdentifier);

        const sender: RequestSender = new RequestSender(url, requestOptions);

        return new Promise<object>((resolve, reject) => {
            sender.json().then(jsonData => {
                resolve(jsonData);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}

interface SearchOption extends AbstractSearchOption {
    /**
     * The type of entity for whom you would like results. These correspond to the entity's definition contract name. For instance, if you are looking for items, this property should be 'DestinyInventoryItemDefinition'. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is tentatively in final form, but there may be bugs that prevent desirable operation.
     */
    entityType: string,
    hashIdentifier: string
}

export default GetDestinyEntityDefinition;