import {DestinyDisplayPropertiesDefinition} from "./Common/DestinyDisplayPropertiesDefinition";
import {DestinyItemTooltipNotification} from "./DestinyItemTooltipNotification";
import {DestinyColor} from "../Misc/DestinyColor";
import {DestinyItemActionBlockDefinition} from "./DestinyItemActionBlockDefinition";
import {DestinyItemInventoryBlockDefinition} from "./DestinyItemInventoryBlockDefinition";
import {DestinyItemSetBlockDefinition} from "./DestinyItemSetBlockDefinition";
import {DestinyItemStatBlockDefinition} from "./DestinyItemStatBlockDefinition";
import {DestinyEquippingBlockDefinition} from "./DestinyEquippingBlockDefinition";
import {DestinyItemTranslationBlockDefinition} from "./DestinyItemTranslationBlockDefinition";
import {DestinyItemPreviewBlockDefinition} from "./DestinyItemPreviewBlockDefinition";
import {HyperlinkReference} from "../../Links/HyperlinkReference";
import {DestinyAnimationReference} from "./Animations/DestinyAnimationReference";
import {DestinyItemPerkEntryDefinition} from "./DestinyItemPerkEntryDefinition";
import {DestinyItemInvestmentStatDefinition} from "./DestinyItemInvestmentStatDefinition";
import {DestinyItemTalentGridBlockDefinition} from "./DestinyItemTalentGridBlockDefinition";
import {DestinyItemSummaryBlockDefinition} from "./DestinyItemSummaryBlockDefinition";
import {DestinyItemSocketBlockDefinition} from "./DestinyItemSocketBlockDefinition";
import {DestinyItemSackBlockDefinition} from "./DestinyItemSackBlockDefinition";
import {DestinyItemGearsetBlockDefinition} from "./DestinyItemGearsetBlockDefinition";
import {DestinyItemPlugDefinition} from "./Items/DestinyItemPlugDefinition";
import {DestinyItemMetricBlockDefinition} from "./DestinyItemMetricBlockDefinition";
import {DestinyItemObjectiveBlockDefinition} from "./DestinyItemObjectiveBlockDefinition";
import {DestinyItemSourceBlockDefinition} from "./DestinyItemSourceBlockDefinition";
import {DestinyItemValueBlockDefinition} from "./DestinyItemValueBlockDefinition";
import {DestinyItemQualityBlockDefinition} from "./DestinyItemQualityBlockDefinition";

export interface DestinyInventoryItemDefinition {
    displayProperties: DestinyDisplayPropertiesDefinition,
    tooltipNotifications: DestinyItemTooltipNotification[],
    /** Destiny.Definitions.Collectibles.DestinyCollectibleDefinition */
    collectibleHash?: number,
    iconWatermark: string,
    iconWatermarkShelved: string,
    secondaryIcon: string,
    secondaryOverlay: string,
    secondarySpecial: string,
    backgroundColor: DestinyColor,
    screenshot: string,
    itemTypeDisplayName: string,
    uiItemDisplayStyle: string,
    itemTypeAndTierDisplayName: string,
    displaySource: string,
    tooltipStyle: string,
    action: DestinyItemActionBlockDefinition,
    inventory: DestinyItemInventoryBlockDefinition,
    setData: DestinyItemSetBlockDefinition,
    stats: DestinyItemStatBlockDefinition,
    emblemObjectiveHash?: number,
    equippingBlock: DestinyEquippingBlockDefinition,
    translationBlock: DestinyItemTranslationBlockDefinition,
    preview: DestinyItemPreviewBlockDefinition,
    quality: DestinyItemQualityBlockDefinition,
    value: DestinyItemValueBlockDefinition,
    sourceData: DestinyItemSourceBlockDefinition,
    objectives: DestinyItemObjectiveBlockDefinition,
    metrics: DestinyItemMetricBlockDefinition,
    plug: DestinyItemPlugDefinition,
    gearset: DestinyItemGearsetBlockDefinition,
    sack: DestinyItemSackBlockDefinition,
    sockets: DestinyItemSocketBlockDefinition,
    summary: DestinyItemSummaryBlockDefinition,
    talentGrid: DestinyItemTalentGridBlockDefinition,
    investmentStats: DestinyItemInvestmentStatDefinition,
    perks: DestinyItemPerkEntryDefinition,
    /** Destiny.Definitions.Lore.DestinyLoreDefinition */
    loreHash?: number,
    /** Destiny.Definitions.DestinyInventoryItemDefinition */
    summaryItemHash?: number,
    animations: DestinyAnimationReference,
    allowActions: boolean,
    links: HyperlinkReference,
    doesPostmasterPullHaveSideEffects: boolean,
    nonTransferrable: boolean,
    /** Destiny.Definitions.DestinyItemCategoryDefinition */
    itemCategoryHashes: number[],
    specialItemType: number,
    itemType: number,
    itemSubType: number,
    classType: number,
    breakerType: number,
    /** Destiny.Definitions.BreakerTypes.DestinyBreakerTypeDefinition */
    breakerTypeHash?: number,
    equippable: boolean,
    /** Destiny.Definitions.DestinyDamageTypeDefinition */
    damageTypeHashes: number[],
    damageTypes: number[],
    defaultDamageType: number
    /** Destiny.Definitions.DestinyDamageTypeDefinition */
    defaultDamageTypeHash?: number,
    /** Destiny.Definitions.Seasons.DestinySeasonDefinition */
    seasonHash?: number,
    isWrapper: boolean,
    traitIds: string[],
    hash: number,
    index: number,
    redacted: boolean
}