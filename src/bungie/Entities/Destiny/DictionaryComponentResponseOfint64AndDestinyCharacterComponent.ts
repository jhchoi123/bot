import {DestinyCharacterComponent} from "./Entities/Characters/DestinyCharacterComponent";
import {StringDictionary} from "../../share/Dictionary";

export interface DictionaryComponentResponseOfint64AndDestinyCharacterComponent {
    data: StringDictionary<DestinyCharacterComponent>,
    privacy: number,
    disabled?: boolean
}