import {DestinyItemActionRequiredItemDefinition} from "./DestinyItemActionRequiredItemDefinition";
import {DestinyProgressionRewardDefinition} from "./DestinyProgressionRewardDefinition";

export interface DestinyItemActionBlockDefinition {
    verbName: string,
    verbDescription: string,
    isPositive: boolean,
    overlayScreenName: string,
    overlayIcon: string,
    requiredCooldownSeconds: number,
    requiredItems: DestinyItemActionRequiredItemDefinition,
    progressionRewards: DestinyProgressionRewardDefinition,
    actionTypeLabel: string,
    requiredLocation: string,
    requiredCooldownHash: number,
    deleteOnAction: boolean,
    consumeEntireStack: boolean,
    useOnAcquire: boolean
}