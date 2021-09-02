import {DestinyItemComponent} from "./Entities/Items/DestinyItemComponent";

export interface SingleComponentResponseOfDestinyItemComponent {
    data: DestinyItemComponent,
    privacy: number,
    disabled?: boolean
}