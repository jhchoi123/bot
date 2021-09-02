import {UserInfoCard} from "../User/UserInfoCard";
import {GroupUserInfoCard} from "./GroupUserInfoCard";

export interface GroupPotentialMember {
    potentialStatus: number,
    groupId: string,
    destinyUserInfo: GroupUserInfoCard,
    bungieNetUserInfo: UserInfoCard,
    joinDate: string
}