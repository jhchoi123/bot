import {DestinyStat} from "../../DestinyStat";
import {DestinyItemInstanceEnergy} from "./DestinyItemInstanceEnergy";

export interface DestinyItemInstanceComponent {
    damageType: number,
    /** Destiny.Definitions.DestinyDamageTypeDefinition */
    damageTypeHash: number,
    primaryStat: DestinyStat,
    itemLevel: number,
    quality: number,
    isEquipped: boolean,
    canEquip: boolean,
    equipRequiredLevel: number,
    /** Destiny.Definitions.DestinyUnlockDefinition*/
    unlockHashesRequiredToEquip: number[],
    cannotEquipReason: number,
    /** None: 0, ShieldPiercing: 1, Disruption: 2, Stagger: 3
     * See More for DestinyBreakerTypeDefinition
     */
    breakerType?: number,
    /** Destiny.Definitions.BreakerTypes.DestinyBreakerTypeDefinition */
    breakerTypeHash?: number,
    energy: DestinyItemInstanceEnergy
}