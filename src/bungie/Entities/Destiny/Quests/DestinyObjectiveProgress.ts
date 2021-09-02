export interface DestinyObjectiveProgress {
    /** Destiny.Definitions.DestinyObjectiveDefinition */
    objectiveHash: number,
    /** Destiny.Definitions.DestinyDestinationDefinition */
    destinationHash?: number,
    /** Destiny.Definitions.DestinyActivityDefinition */
    activityHash?: number,
    progress?: number,
    completionValue: number,
    complete: boolean,
    visible: boolean
}