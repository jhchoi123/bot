import {GroupUserInfoCard} from "../GroupV2/GroupUserInfoCard";
import {GeneralUser} from "./GeneralUser";

export interface UserMembershipData {
    destinyMemberships: GroupUserInfoCard[],
    primaryMembershipId?: string,
    bungieNetUser: GeneralUser
}