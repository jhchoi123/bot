import {NumberDictionary} from "../../../share/Dictionary";
import {DestinyInventoryItemStatDefinition} from "./DestinyInventoryItemStatDefinition";

export interface DestinyItemStatBlockDefinition {
    disablePrimaryStatDisplay: boolean,
    /** Destiny.Definitions.DestinyStatGroupDefinition */
    statGroupHash?: number,
    /** Destiny.Definitions.DestinyStatDefinition*/
    stats: NumberDictionary<DestinyInventoryItemStatDefinition>,
    hasDisplayableStats: boolean,
    /** Destiny.Definitions.DestinyStatDefinition */
    primaryBaseStatHash: number
}
