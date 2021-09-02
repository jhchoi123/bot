import {DestinyProgression} from "../Destiny/DestinyProgression";
import {ClanBanner} from "./ClanBanner";

export interface GroupV2ClanInfoAndInvestment {
    d2ClanProgressions: DestinyProgression,
    clanCallsign: string,
    clanBannerData: ClanBanner
}