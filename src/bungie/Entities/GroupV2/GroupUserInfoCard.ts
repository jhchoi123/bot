export interface GroupUserInfoCard {
    LastSeenDisplayName: string,
    LastSeenDisplayNameType: number,
    supplementalDisplayName: string,
    iconPath: string,
    crossSaveOverride: number,
    applicableMembershipTypes: number[],
    isPublic: boolean,
    membershipType: number,
    membershipId: string,
    displayName: string
}