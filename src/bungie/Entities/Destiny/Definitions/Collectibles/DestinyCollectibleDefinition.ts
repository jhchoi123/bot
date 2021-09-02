import {DestinyDisplayPropertiesDefinition} from "../Common/DestinyDisplayPropertiesDefinition";

export interface DestinyCollectibleDefinition {
    displayProperties: DestinyDisplayPropertiesDefinition,
    scope: number,
    sourceString: string,
    sourceHash?: number,
    /** Destiny.Definitions.DestinyInventoryItemDefinition */
    itemHash: number,
    acquisitionInfo: any, // Destiny.Definitions.Collectibles.DestinyCollectibleAcquisitionBlock
    stateInfo: any, // Destiny.Definitions.Collectibles.DestinyCollectibleStateBlock
    presentationInfo: any, // Destiny.Definitions.Presentation.DestinyPresentationChildBlock
    presentationNodeType: number,
    traitIds: string[],
    /** Destiny.Definitions.Traits.DestinyTraitDefinition */
    traitHashes: number[],
    /** Destiny.Definitions.Presentation.DestinyPresentationNodeDefinition */
    parentNodeHashes: number[],
    hash: number,
    index: number,
    redacted: boolean
}