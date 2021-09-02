import {PagedQuery} from "../Queries/PagedQuery";
import {DestinyEntitySearchResultItem} from "./Definitions/DestinyEntitySearchResultItem";

export interface SearchResultOfDestinyEntitySearchResultItem {
    results: DestinyEntitySearchResultItem[],
    totalResults: number,
    hasMore?: boolean,
    query?: PagedQuery,
    replacementContinuationToken?: string,
    useTotalResults?: boolean
}