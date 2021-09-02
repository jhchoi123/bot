export interface DestinyItemInventoryBlockDefinition {
    stackUniqueLabel: string,
    maxStackSize: number,
    /** Destiny.Definitions.DestinyInventoryBucketDefinition */
    bucketTypeHash: number,
    /** Destiny.Definitions.DestinyInventoryBucketDefinition */
    recoveryBucketTypeHash: number,
    /** Destiny.Definitions.Items.DestinyItemTierTypeDefinition */
    tierTypeHash: number,
    isInstanceItem: boolean,
    tierTypeName: string,
    tierType: number,
    expirationTooltip: string,
    expiredInActivityMessage: string,
    expiredInOrbitMessage: string,
    suppressExpirationWhenObjectivesComplete: boolean
}