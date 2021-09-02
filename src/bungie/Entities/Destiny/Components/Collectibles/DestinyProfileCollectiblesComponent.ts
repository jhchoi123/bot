import {NumberDictionary} from "../../../../share/Dictionary";
import {DestinyCollectibleComponent} from "./DestinyCollectibleComponent";

export interface DestinyProfileCollectiblesComponent {
    /** Destiny.Definitions.Collectibles.DestinyCollectibleDefinition */
    recentCollectibleHashes: number[],
    /** Destiny.Definitions.Collectibles.DestinyCollectibleDefinition */
    newnessFlaggedCollectibleHashes: number[],
    /** Destiny.Definitions.Collectibles.DestinyCollectibleDefinition */
    collectibles: NumberDictionary<DestinyCollectibleComponent>,
    /** Destiny.Definitions.Presentation.DestinyPresentationNodeDefinition */
    collectionCategoriesRootNodeHash: number,
    /** Destiny.Definitions.Presentation.DestinyPresentationNodeDefinition */
    collectionBadgesRootNodeHash: number
}