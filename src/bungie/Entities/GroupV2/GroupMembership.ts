import {GroupMember} from "./GroupMember";
import {GroupV2} from "./GroupV2";

export interface GroupMembership {
    member: GroupMember,
    group: GroupV2
}