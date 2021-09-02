import {DestinyItemSourceDefinition} from "./Sources/DestinyItemSourceDefinition";
import {DestinyItemVendorSourceReference} from "./DestinyItemVendorSourceReference";

export interface DestinyItemSourceBlockDefinition {
    /** Destiny.Definitions.DestinyRewardSourceDefinition */
    sourceHashes: number[],
    sources: DestinyItemSourceDefinition[],
    exclusive: number,
    vendorSources: DestinyItemVendorSourceReference[]
}