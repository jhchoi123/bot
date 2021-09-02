import {GroupV2} from "./GroupV2";
import {GroupMember} from "./GroupMember";
import {NumberDictionary} from "../../share/Dictionary";
import {GroupPotentialMember} from "./GroupPotentialMember";

export interface GroupResponse {
    detail: GroupV2,
    founder: GroupMember,
    alliedIds: string[],
    parentGroup: GroupV2,
    allianceStatus: number,
    groupJoinInviteCount: number,
    currentUserMembershipsInactiveForDestiny: boolean,
    currentUserMemberMap: NumberDictionary<GroupMember>,
    currentUserPotentialMemberMap: NumberDictionary<GroupPotentialMember>
}