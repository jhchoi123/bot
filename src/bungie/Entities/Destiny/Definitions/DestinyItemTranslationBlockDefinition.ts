import {DyeReference} from "../DyeReference";
import {DestinyGearArtArrangementReference} from "./DestinyGearArtArrangementReference";

export interface DestinyItemTranslationBlockDefinition {
    weaponPatternIdentifier: string,
    weaponPatternHash: number,
    defaultDyes: DyeReference[],
    lockedDyes: DyeReference[],
    customDyes: DyeReference[],
    arrangements: DestinyGearArtArrangementReference[],
    hasGeometry: boolean
}