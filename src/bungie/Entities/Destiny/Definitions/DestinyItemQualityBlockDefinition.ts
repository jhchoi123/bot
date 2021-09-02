import {DestinyItemVersionDefinition} from "./DestinyItemVersionDefinition";

export interface DestinyItemQualityBlockDefinition {
    itemLevels: number[],
    qualityLevel: number,
    infusionCategoryName: string,
    infusionCategoryHash: number,
    infusionCategoryHashes: number[],
    /** Destiny.Definitions.Progression.DestinyProgressionLevelRequirementDefinition */
    progressionLevelRequirementHash: number,
    currentVersion: number,
    versions: DestinyItemVersionDefinition,
    displayVersionWatermarkIcons: string[]
}