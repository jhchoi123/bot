import {DestinyObjectiveDisplayProperties} from "./DestinyObjectiveDisplayProperties";

export interface DestinyItemObjectiveBlockDefinition {
    /** Destiny.Definitions.DestinyObjectiveDefinition */
    objectiveHashes: number[],
    /** Destiny.Definitions.DestinyActivityDefinition */
    displayActivityHashes: number[],
    requireFullObjectiveCompletion: boolean,
    /** Destiny.Definitions.DestinyInventoryItemDefinition */
    questlineItemHash: number,
    narrative: string,
    objectiveVerbName: string,
    questTypeIdentifier: string,
    questTypeHash: number,
    perObjectiveDisplayProperties: DestinyObjectiveDisplayProperties,
    displayAsStatTracker: boolean
}