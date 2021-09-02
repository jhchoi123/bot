import {SingleComponentResponseOfDestinyVendorReceiptsComponent} from "../SingleComponentResponseOfDestinyVendorReceiptsComponent";
import {SingleComponentResponseOfDestinyInventoryComponent} from "../SingleComponentResponseOfDestinyInventoryComponent";
import {SingleComponentResponseOfDestinyProfileComponent} from "../SingleComponentResponseOfDestinyProfileComponent";
import {SingleComponentResponseOfDestinyPlatformSilverComponent} from "../SingleComponentResponseOfDestinyPlatformSilverComponent";
import {SingleComponentResponseOfDestinyKiosksComponent} from "../SingleComponentResponseOfDestinyKiosksComponent";
import {DictionaryComponentResponseOfint64AndDestinyCharacterComponent} from "../DictionaryComponentResponseOfint64AndDestinyCharacterComponent";
import {DictionaryComponentResponseOfint64AndDestinyInventoryComponent} from "../DictionaryComponentResponseOfint64AndDestinyInventoryComponent";
import {SingleComponentResponseOfDestinyProfileCollectiblesComponent} from "../SingleComponentResponseOfDestinyProfileCollectiblesComponent";

export interface DestinyProfileResponse {
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


    profileCollectibles: SingleComponentResponseOfDestinyProfileCollectiblesComponent,
    /*
    profileTransitoryData,
    metrics,
     */

    characters: DictionaryComponentResponseOfint64AndDestinyCharacterComponent,
    characterInventories: DictionaryComponentResponseOfint64AndDestinyInventoryComponent,

    /*
    characterProgressions,
    characterRenderData,
    characterActivities,
    */

    characterEquipment: SingleComponentResponseOfDestinyInventoryComponent,

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