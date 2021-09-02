import {DestinyItemSocketEntryPlugItemDefinition} from "./DestinyItemSocketEntryPlugItemDefinition";

export interface DestinyItemSocketEntryDefinition {
    /** Destiny.Definitions.Sockets.DestinySocketTypeDefinition */
    socketTypeHash: number,
    /** Destiny.Definitions.DestinyInventoryItemDefinition */
    singleInitialItemHash: number,
    reusablePlugItems: DestinyItemSocketEntryPlugItemDefinition,
    preventInitializationOnVendorPurchase: boolean,
    hidePerksInItemTooltip: boolean,
    plugSources: number,
    /** Destiny.Definitions.Sockets.DestinyPlugSetDefinition */
    reusablePlugSetHash?: number,
    /** Destiny.Definitions.Sockets.DestinyPlugSetDefinition */
    randomizedPlugSetHash?: number,
    defaultVisible: boolean
}