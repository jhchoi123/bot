import {DestinyItemQuantity} from "../DestinyItemQuantity";

export interface DestinyVendorReceipt {
    currencyPaid: DestinyItemQuantity[],
    itemReceived: DestinyItemQuantity,
    licenseUnlockHash: number,
    purchasedByCharacterId: string,
    refundPolicy: number,
    sequenceNumber: number,
    timeToExpiration: string,
    expiresOn: string
}