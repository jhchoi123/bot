import {DestinyInventoryComponent} from "./Entities/Inventory/DestinyInventoryComponent";

export interface SingleComponentResponseOfDestinyInventoryComponent {
    data: DestinyInventoryComponent,
    privacy: number,
    disabled?: boolean
}