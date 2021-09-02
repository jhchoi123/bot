"use strict";
// https://bungie-net.github.io/multi/schema_BungieMembershipType.html#schema_BungieMembershipType
Object.defineProperty(exports, "__esModule", { value: true });
class BungieMembershipType {
    constructor() {
    }
}
BungieMembershipType.None = 0;
BungieMembershipType.Xbox = 1;
BungieMembershipType.Psn = 2;
BungieMembershipType.Steam = 3;
BungieMembershipType.Blizzard = 4;
BungieMembershipType.Stadia = 5;
BungieMembershipType.Demon = 10;
BungieMembershipType.BungieNext = 254;
BungieMembershipType.All = -1;
exports.default = BungieMembershipType;
