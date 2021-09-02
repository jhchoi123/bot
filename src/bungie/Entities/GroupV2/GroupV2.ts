import {GroupFeatures} from "./GroupFeatures";
import {GroupV2ClanInfoAndInvestment} from "./GroupV2ClanInfoAndInvestment";

export interface GroupV2 {
    groupId: string,
    name: string,
    groupType: number,
    membershipIdCreated: string,
    creationDate: string,
    modificationDate: string,
    about: string,
    tags: string[],
    memberCount: number,
    isPublic: boolean,
    isPublicTopicAdminOnly: boolean,
    motto: string,
    allowChat: boolean,
    isDefaultPostPublic: boolean,
    chatSecurity: number,
    locale: string,
    avatarImageIndex: number,
    homepage: number,
    membershipOption: number,
    defaultPublicity: number,
    theme: string,
    bannerPath: string,
    avatarPath: string,
    conversationId: string,
    enableInvitationMessagingForAdmins: boolean,
    banExpireDate?: string,
    features: GroupFeatures,
    clanInfo: GroupV2ClanInfoAndInvestment
}