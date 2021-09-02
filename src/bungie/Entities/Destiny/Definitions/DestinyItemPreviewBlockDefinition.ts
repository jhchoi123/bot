import {DestinyDerivedItemCategoryDefinition} from "./Items/DestinyDerivedItemCategoryDefinition";

export interface DestinyItemPreviewBlockDefinition {
    screenStyle: string,
    /** Destiny.Definitions.DestinyVendorDefinition */
    previewVendorHash: number,
    /** Destiny.Definitions.Artifacts.DestinyArtifactDefinition */
    artifactHash?: number,
    previewActionString: string,
    derivedItemCategories: DestinyDerivedItemCategoryDefinition[]
}