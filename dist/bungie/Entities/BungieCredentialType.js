"use strict";
// https://bungie-net.github.io/multi/schema_BungieCredentialType.html#schema_BungieCredentialType
Object.defineProperty(exports, "__esModule", { value: true });
class BungieCredentialType {
    constructor() {
    }
}
BungieCredentialType.None = 0;
BungieCredentialType.Xuid = 1;
BungieCredentialType.Psnid = 2;
BungieCredentialType.Wlid = 3;
BungieCredentialType.Fake = 4;
BungieCredentialType.Facebook = 5;
BungieCredentialType.Google = 8;
BungieCredentialType.Windows = 9;
BungieCredentialType.DemonId = 10;
BungieCredentialType.SteamId = 12;
BungieCredentialType.BattleNetId = 14;
BungieCredentialType.StadiaId = 16;
BungieCredentialType.TwitchId = 18;
exports.default = BungieCredentialType;
