import {NumberDictionary} from "../../../../share/Dictionary";
import {DestinyCollectibleComponent} from "./DestinyCollectibleComponent";

export interface DestinyCollectiblesComponent {
    /** Destiny.Definitions.Collectibles.DestinyCollectibleDefinition */
    collectibles: NumberDictionary<DestinyCollectibleComponent>,
    /** Destiny.Definitions.Presentation.DestinyPresentationNodeDefinition */
    collectionCategoriesRootNodeHash: number,
    /** Destiny.Definitions.Presentation.DestinyPresentationNodeDefinition */
    collectionBadgesRootNodeHash: number
}