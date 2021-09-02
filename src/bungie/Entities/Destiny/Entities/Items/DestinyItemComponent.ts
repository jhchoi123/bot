import {DestinyObjectiveProgress} from "../../Quests/DestinyObjectiveProgress";

export interface DestinyItemComponent {
    /** Destiny.Definitions.DestinyInventoryItemDefinition */
    itemHash: number,
    itemInstanceId: string,
    quantity: number,
    bindStatus: number,
    location: number,
    /** Destiny.Definitions.DestinyInventoryBucketDefinition */
    bucketHash: number,
    transferStatus: number,
    lockable: boolean,
    state: number,
    /** Destiny.Definitions.DestinyInventoryItemDefinition */
    overrideStyleItemHash?: number
    expirationDate?: string,
    isWrapper: boolean,
    tooltipNotificationIndexes: number[],
    metricHash?: number,
    metricObjective: DestinyObjectiveProgress,
    versionNumber?: number
}