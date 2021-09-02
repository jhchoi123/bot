import {DestinyInventoryComponent} from "./Entities/Inventory/DestinyInventoryComponent";
import {StringDictionary} from "../../share/Dictionary";

export interface DictionaryComponentResponseOfint64AndDestinyInventoryComponent {
    data: StringDictionary<DestinyInventoryComponent>,
    privacy: number,
    disabled?: boolean
}