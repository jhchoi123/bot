import {DestinyProfileComponent} from "./Entities/Profiles/DestinyProfileComponent";

export interface SingleComponentResponseOfDestinyProfileComponent {
    data: DestinyProfileComponent,
    privacy: number,
    disabled?: boolean
}