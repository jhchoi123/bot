import {UserInfoCard} from "../../../User/UserInfoCard";

export interface DestinyProfileComponent {
    userInfo: UserInfoCard,
    dateLastPlayed: string,
    versionsOwned: number,
    characterIds: string[],
    /** Destiny.Definitions.Seasons.DestinySeasonDefinition */
    seasonHashes: number[],
    /** Destiny.Definitions.Seasons.DestinySeasonDefinition */
    currentSeasonHash?: number,
    currentSeasonRewardPowerCap?: number
}