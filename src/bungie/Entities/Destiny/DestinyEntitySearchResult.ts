import {SearchResultOfDestinyEntitySearchResultItem} from "./SearchResultOfDestinyEntitySearchResultItem";

export interface DestinyEntitySearchResult {
    suggestedWords: string[],
    results: SearchResultOfDestinyEntitySearchResultItem
}