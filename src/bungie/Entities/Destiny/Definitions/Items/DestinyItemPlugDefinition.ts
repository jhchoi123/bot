import {DestinyEnergyCostEntry} from "./DestinyEnergyCostEntry";
import {DestinyEnergyCapacityEntry} from "./DestinyEnergyCapacityEntry";
import {DestinyParentItemOverride} from "./DestinyParentItemOverride";
import {DestinyPlugRuleDefinition} from "./DestinyPlugRuleDefinition";

export interface DestinyItemPlugDefinition {
    insertionRules: DestinyPlugRuleDefinition[],
    plugCategoryIdentifier: string,
    plugCategoryHash: number,
    onActionRecreateSelf: boolean,
    /** Destiny.Definitions.DestinyMaterialRequirementSetDefinition */
    insertionMaterialRequirementHash: number,
    /** Destiny.Definitions.DestinyInventoryItemDefinition */
    previewItemOverrideHash: number,
    /** Destiny.Definitions.DestinyMaterialRequirementSetDefinition */
    enabledMaterialRequirementHash: number,
    enabledRules: DestinyPlugRuleDefinition[],
    uiPlugLabel: string,
    plugStyle: number,
    plugAvailability: number,
    alternateUiPlugLabel: string,
    alternatePlugStyle: number,
    isDummyPlug: boolean,
    parentItemOverride: DestinyParentItemOverride,
    energyCapacity: DestinyEnergyCapacityEntry,
    energyCost: DestinyEnergyCostEntry
}