import {DestinyInventoryItemStatDefinition} from "../DestinyInventoryItemStatDefinition";
import {NumberDictionary} from "../../../../share/Dictionary";

export interface DestinyItemSourceDefinition {
    level: number,
    minQuality: number,
    maxQuality: number,
    minLevelRequired: number,
    maxLevelRequired: number,
    computedStats: NumberDictionary<DestinyInventoryItemStatDefinition>,
    /** Destiny.Definitions.DestinyRewardSourceDefinition */
    sourceHashes: number[]
}