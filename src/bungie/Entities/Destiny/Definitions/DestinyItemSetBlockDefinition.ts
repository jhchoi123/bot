import {DestinyItemSetBlockEntryDefinition} from "./DestinyItemSetBlockEntryDefinition";

export interface DestinyItemSetBlockDefinition {
    itemList: DestinyItemSetBlockEntryDefinition[],
    requireOrderedSetItemAdd: boolean,
    setIsFeatured: boolean,
    setType: string,
    questLineName: string,
    questLineDescription: string,
    questStepSummary: string
}