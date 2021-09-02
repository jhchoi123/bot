import {DestinyItemInstanceComponent} from "./Entities/Items/DestinyItemInstanceComponent";

export interface SingleComponentResponseOfDestinyItemInstanceComponent {
    data: DestinyItemInstanceComponent,
    privacy: number,
    disabled?: boolean
}