class DestinyCollectibleState {
    public static readonly None: number = 0;
    /** If this flag is set, you have not yet obtained this collectible. */
    public static readonly NotAcquired: number = 1;
    /** If this flag is set, the item is "obscured" to you: you can/should use the alternate item hash found in DestinyCollectibleDefinition.stateInfo.obscuredOverrideItemHash when displaying this collectible instead of the default display info.*/
    public static readonly Obscured: number = 2;
    /** If this flag is set, the collectible should not be shown to the user.
     Please do consider honoring this flag. It is used - for example - to hide items that a person didn't get from the Eververse. I can't prevent these from being returned in definitions, because some people may have acquired them and thus they should show up: but I would hate for people to start feeling some variant of a Collector's Remorse about these items, and thus increasing their purchasing based on that compulsion. That would be a very unfortunate outcome, and one that I wouldn't like to see happen. So please, whether or not I'm your mom, consider honoring this flag and don't show people invisible collectibles.*/
    public static readonly Invisible: number = 4;
    /** If this flag is set, the collectible requires payment for creating an instance of the item, and you are lacking in currency. Bring the benjamins next time. Or spinmetal. Whatever.*/
    public static readonly CannotAffordMaterialRequirements: number = 8;
    /** If this flag is set, you can't pull this item out of your collection because there's no room left in your inventory.*/
    public static readonly InventorySpaceUnavailable: number = 16;
    /** If this flag is set, you already have one of these items and can't have a second one.*/
    public static readonly UniquenessViolation: number = 32;
    /** If this flag is set, the ability to pull this item out of your collection has been disabled.*/
    public static readonly PurchaseDisabled: number = 64;

    private constructor() {
    }
}

export default DestinyCollectibleState;