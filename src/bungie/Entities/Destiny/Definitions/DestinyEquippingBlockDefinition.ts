export interface DestinyEquippingBlockDefinition {
    /** Destiny.Definitions.DestinyInventoryItemDefinition */
    gearsetItemHash?: number,
    uniqueLabel: string,
    uniqueLabelHash: number,
    /** Destiny.Definitions.DestinyEquipmentSlotDefinition */
    equipmentSlotTypeHash: number,
    attributes: number,
    ammoType: number,
    displayStrings: string[]
}