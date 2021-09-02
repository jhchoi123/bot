import {DestinyProgressionResetEntry} from "./DestinyProgressionResetEntry";

export interface DestinyProgression {
    /** Destiny.Definitions.DestinyProgressionDefinition */
    progressionHash: number,
    dailyProgress: number,
    dailyLimit: number,
    weeklyProgress: number,
    weeklyLimit: number,
    currentProgress: number,
    level: number,
    levelCap: number,
    stepIndex: number,
    progressToNextLevel: number,
    nextLevelAt: number,
    currentResetCount?: number,
    seasonResets: DestinyProgressionResetEntry[],
    rewardItemStates: number
}