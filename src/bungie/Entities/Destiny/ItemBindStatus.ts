class ItemBindStatus {
    public static readonly NotBound: number = 0;
    public static readonly BoundToCharacter: number = 1;
    public static readonly BoundToAccount: number = 2;
    public static readonly BoundToGuild: number = 3;

    private constructor() {
    }
}

export default ItemBindStatus;