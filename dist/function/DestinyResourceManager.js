"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DestinyManifestDAO_1 = __importDefault(require("../db/dao/DestinyManifestDAO"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const fs_1 = __importDefault(require("fs"));
class DestinyResourceManager {
    constructor() {
        this.ROOT_URL = "https://www.bungie.net/";
    }
    async downloadDestinyInventoryItemDefinition(localeCode) {
        const manifest = await DestinyManifestDAO_1.default.getDestinyManifest();
        const contentUrl = manifest.jsonWorldComponentContentPaths[localeCode].DestinyInventoryItemDefinition;
        node_fetch_1.default(this.ROOT_URL + contentUrl).then(async (response) => {
            const content = await response.json();
            await fs_1.default.promises.writeFile(__dirname + "/../resources/destiny/"
                + localeCode + "/DestinyInventoryItemDefinition.json", JSON.stringify(content));
        });
    }
    async getDefinition(localeCode) {
        const raw = await fs_1.default.promises.readFile(__dirname + "/../resources/destiny/"
            + localeCode + "/DestinyInventoryItemDefinition.json");
        return JSON.parse(raw.toString());
    }
}
exports.default = DestinyResourceManager;
