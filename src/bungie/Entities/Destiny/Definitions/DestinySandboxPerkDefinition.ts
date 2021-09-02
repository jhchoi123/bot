import {DestinyDisplayPropertiesDefinition} from "./Common/DestinyDisplayPropertiesDefinition";
import {DestinyTalentNodeStepGroups} from "./DestinyTalentNodeStepGroups";

export interface DestinySandboxPerkDefinition {
    displayProperties: DestinyDisplayPropertiesDefinition,
    perkIdentifier: string,
    isDisplayable: boolean,
    damageType: number,
    damageTypeHash?: number,
    perkGroups: DestinyTalentNodeStepGroups,
    hash: number,
    index: number,
    redacted: boolean
}