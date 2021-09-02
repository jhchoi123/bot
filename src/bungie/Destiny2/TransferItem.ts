// https://bungie-net.github.io/multi/operation_post_Destiny2-TransferItem.html#operation_post_Destiny2-TransferItem

import AbstractAPIEndpoint from "../share/AbstractAPIEndpoint";
import {AbstractSearchOption} from "../share/AbstractSearchOption";
import RequestSender from "../share/RequestSender";
import {RequestInit} from "node-fetch";
import BungieMembershipType from "../Entities/BungieMembershipType";

/**
 *  This Endpoint Implementation Not Tested Yet
 */
class TransferItem extends AbstractAPIEndpoint {
    public static readonly PATH = "/Destiny2/Actions/Items/TransferItem/";
    public static readonly METHOD = "POST";
    public static readonly FULL_URL = TransferItem.ROOT_PATH + TransferItem.PATH;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        super(X_API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET);
    }

    public get membershipType() {
        return BungieMembershipType;
    }

    execute(options: SearchOption): object {
        const bodyData = {
            itemReferenceHash: options.itemReferenceHash,
            stackSize: options.stackSize,
            transferToVault: options.transferToVault,
            itemId: options.itemId,
            characterId: options.characterId,
            membershipType: options.membershipType
        };

        const requestOptions: RequestInit = {
            headers: this.createHeaders(options.oAuthToken),
            method: TransferItem.METHOD,
            body: JSON.stringify(bodyData)
        };

        const sender: RequestSender = new RequestSender(TransferItem.FULL_URL, requestOptions);

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
    itemReferenceHash?: number,
    stackSize?: number,
    transferToVault?: boolean,
    itemId?: string,
    characterId?: string,
    membershipType?: number
}

export default TransferItem;