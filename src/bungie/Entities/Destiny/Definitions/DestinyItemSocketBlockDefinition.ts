import {DestinyItemSocketEntryDefinition} from "./DestinyItemSocketEntryDefinition";
import {DestinyItemIntrinsicSocketEntryDefinition} from "./DestinyItemIntrinsicSocketEntryDefinition";
import {DestinyItemSocketCategoryDefinition} from "./DestinyItemSocketCategoryDefinition";

export interface DestinyItemSocketBlockDefinition {
    detail: string,
    socketEntries: DestinyItemSocketEntryDefinition[],
    intrinsicSockets: DestinyItemIntrinsicSocketEntryDefinition[],
    socketCategories: DestinyItemSocketCategoryDefinition[]
}