import {DestinyColor} from "../../Misc/DestinyColor";
import {DestinyProgression} from "../../DestinyProgression";

export interface DestinyCharacterComponent {
    membershipId: string,
    membershipType: number,
    characterId: number,
    dateLastPlayed: string,
    minutesPlayedThisSession: string,
    minutesPlayedTotal: string,
    light: number,
    stats: object,
    /** Destiny.Definitions.DestinyRaceDefinition */
    raceHash: number,
    /** Destiny.Definitions.DestinyGenderDefinition */
    genderHash: number,
    /** Destiny.Definitions.DestinyClassDefinition */
    classHash: number,
    raceType: number,
    classType: number,
    genderType: number,
    emblemPath: string,
    emblemBackgroundPath: string,
    /** Destiny.Definitions.DestinyInventoryItemDefinition */
    emblemHash: number,
    emblemColor: DestinyColor,
    levelProgression: DestinyProgression,
    baseCharacterLevel: number,
    percentToNextLevel: number,
    /** Destiny.Definitions.Records.DestinyRecordDefinition */
    titleRecordHash: number
}