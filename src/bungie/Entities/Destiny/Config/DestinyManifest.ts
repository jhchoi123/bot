import {GearAssetDataBaseDefinition} from "./GearAssetDataBaseDefinition";
import {StringDictionary} from "../../../share/Dictionary";
import {ImagePyramidEntry} from "./ImagePyramidEntry";

export interface DestinyManifest {
    version: string,
    mobileAssetContentPath: string,
    mobileGearAssetDataBases: GearAssetDataBaseDefinition[],
    mobileWorldContentPaths: StringDictionary<string>,
    jsonWorldContentPaths: StringDictionary<string>,
    jsonWorldComponentContentPaths: StringDictionary<StringDictionary<StringDictionary<string>>>,
    mobileClanBannerDatabasePath: string,
    mobileGearCDN: StringDictionary<string>,
    iconImagePyramidInfo: ImagePyramidEntry[]
}