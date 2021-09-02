class DamageType {
    public static readonly None: number = 0;
    public static readonly Kinetic: number = 1;
    public static readonly Arc: number = 2;
    public static readonly Thermal: number = 3;
    public static readonly Void: number = 4;
    public static readonly Raid: number = 5;
    public static readonly Stasis: number = 6;

    private constructor() {
    }
}

export default DamageType;