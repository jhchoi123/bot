// https://bungie-net.github.io/multi/schema_BungieCredentialType.html#schema_BungieCredentialType

class BungieCredentialType {
    public static readonly None: number = 0;
    public static readonly Xuid: number = 1;
    public static readonly Psnid: number = 2;
    public static readonly Wlid: number = 3;
    public static readonly Fake: number = 4;
    public static readonly Facebook: number = 5;
    public static readonly Google: number = 8;
    public static readonly Windows: number = 9;
    public static readonly DemonId: number = 10;
    public static readonly SteamId: number = 12;
    public static readonly BattleNetId: number = 14;
    public static readonly StadiaId: number = 16;
    public static readonly TwitchId: number = 18;

    private constructor() {
    }
}

export default BungieCredentialType;