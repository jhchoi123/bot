// https://bungie-net.github.io/multi/schema_BungieMembershipType.html#schema_BungieMembershipType

class BungieMembershipType {

    public static readonly None: number = 0;
    public static readonly Xbox: number = 1;
    public static readonly Psn: number = 2;
    public static readonly Steam: number = 3;
    public static readonly Blizzard: number = 4;
    public static readonly Stadia: number = 5;
    public static readonly Demon: number = 10;
    public static readonly BungieNext: number = 254;
    public static readonly All: number = -1;

    private constructor() {
    }
}

export interface MembershipType {
    None: 0,
    TigerXbox: 1,
    TigerPsn: 2,
    TigerSteam: 3,
    TigerBlizzard: 4,
    TigerStadia: 5,
    TigerDemon: 10,
    BungieNext: 254,
    All: -1
}

export default BungieMembershipType;