import {StringDictionary} from "../../share/Dictionary";
import {PagedQuery} from "../Queries/PagedQuery";
import {GroupMembership} from "./GroupMembership";

export interface GetGroupsForMemberResponse {
    areAllMembershipsInactive: StringDictionary<boolean>,
    results: GroupMembership[],
    totalResults: number,
    hasMore: boolean,
    query: PagedQuery,
    replacementContinuationToken: string,
    useTotalResults: boolean
}