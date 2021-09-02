import {GroupMember} from "./GroupMember";
import {PagedQuery} from "../Queries/PagedQuery";

export interface SearchResultOfGroupMember {
    results: GroupMember[],
    totalResults: number,
    hasMore: boolean,
    query: PagedQuery,
    replacementContinuationToken: string,
    useTotalResults: boolean
}