import {GroupUserInfoCard} from "./GroupUserInfoCard";
import {UserInfoCard} from "../User/UserInfoCard";

export interface GroupMember {
    memberType: number,
    isOnline: boolean,
    lastOnlineStatusChange: string,
    groupId: string,
    destinyUserInfo: GroupUserInfoCard,
    bungieNetUserInfo: UserInfoCard,
    joinDate: string
}