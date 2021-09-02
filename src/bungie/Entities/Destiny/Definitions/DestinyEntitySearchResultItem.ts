import {DestinyDisplayPropertiesDefinition} from "./Common/DestinyDisplayPropertiesDefinition";

export interface DestinyEntitySearchResultItem {
    hash: number,
    entityTyp: string,
    displayProperties: DestinyDisplayPropertiesDefinition,
    weight: number
}