import {SingleComponentResponseOfDestinyItemComponent} from "../SingleComponentResponseOfDestinyItemComponent";
import {SingleComponentResponseOfDestinyItemInstanceComponent} from "../SingleComponentResponseOfDestinyItemInstanceComponent";
import {SingleComponentResponseOfDestinyItemPerksComponent} from "../SingleComponentResponseOfDestinyItemPerksComponent";

export interface DestinyItemResponse {
    characterId?: string,
    item: SingleComponentResponseOfDestinyItemComponent,
    instance: SingleComponentResponseOfDestinyItemInstanceComponent,
    //objectives: ,
    perks: SingleComponentResponseOfDestinyItemPerksComponent

    /*
    renderData: ,
    stats: ,
    talentGrid: ,
    sockets: ,
    reusablePlugs: ,
    plugObjectives:
    */
}