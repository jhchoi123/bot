class ItemLocation {
    public static readonly Unknown: number = 0;
    public static readonly Inventory: number = 1;
    public static readonly Vault: number = 2;
    public static readonly Vendor: number = 3;
    public static readonly Postmaster: number = 4;

    private constructor() {
    }
}

export default ItemLocation;