import {SingleComponentResponseOfDestinyVendorReceiptsComponent} from "../SingleComponentResponseOfDestinyVendorReceiptsComponent";
import {SingleComponentResponseOfDestinyInventoryComponent} from "../SingleComponentResponseOfDestinyInventoryComponent";
import {SingleComponentResponseOfDestinyProfileComponent} from "../SingleComponentResponseOfDestinyProfileComponent";
import {SingleComponentResponseOfDestinyPlatformSilverComponent} from "../SingleComponentResponseOfDestinyPlatformSilverComponent";
import {SingleComponentResponseOfDestinyKiosksComponent} from "../SingleComponentResponseOfDestinyKiosksComponent";
import {SingleComponentResponseOfDestinyProfileCollectiblesComponent} from "../SingleComponentResponseOfDestinyProfileCollectiblesComponent";

export interface DestinyCharacterResponse {
    vendorReceipts: SingleComponentResponseOfDestinyVendorReceiptsComponent,
    profileInventory: SingleComponentResponseOfDestinyInventoryComponent,
    profileCurrencies: SingleComponentResponseOfDestinyInventoryComponent,
    profile: SingleComponentResponseOfDestinyProfileComponent,
    platformSilver: SingleComponentResponseOfDestinyPlatformSilverComponent,
    profileKiosks: SingleComponentResponseOfDestinyKiosksComponent,

    /*
    profilePlugSets,
    profileProgression,
    profilePresentationNodes,
    profileRecords,
    */

    collectibles: SingleComponentResponseOfDestinyProfileCollectiblesComponent,
    /*
    profileTransitoryData,
    metrics,
     */

    // character: ,
    inventory: SingleComponentResponseOfDestinyInventoryComponent,

    /*
    characterProgressions,
    characterRenderData,
    characterActivities,
    */

    equipment: SingleComponentResponseOfDestinyInventoryComponent,

    /*
    characterKiosks,
    characterPlugSets,
    characterUninstancedItemComponents,
    characterPresentationNodes,
    characterRecords,
    characterCollectibles,
    itemComponents,
    characterCurrencyLookups
     */
}