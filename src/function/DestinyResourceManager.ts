import DestinyManifestDAO from "../db/dao/DestinyManifestDAO";
import fetch from "node-fetch";
import fs from "fs";
import {DestinyInventoryItemDefinition} from "../bungie/Entities/Destiny/Definitions/DestinyInventoryItemDefinition";

class DestinyResourceManager {
    private readonly ROOT_URL = "https://www.bungie.net/";

    public async downloadDestinyInventoryItemDefinition(localeCode: string) {
        const manifest = await DestinyManifestDAO.getDestinyManifest();

        const contentUrl = manifest.jsonWorldComponentContentPaths[localeCode].DestinyInventoryItemDefinition;

        fetch(this.ROOT_URL + contentUrl).then(async response => {
            const content = await response.json();

            await fs.promises.writeFile(__dirname + "/../resources/destiny/"
                + localeCode + "/DestinyInventoryItemDefinition.json",
                JSON.stringify(content));
        });
    }

    public async getDefinition(localeCode: string): Promise<DestinyInventoryItemDefinition> {
        const raw = await fs.promises.readFile(__dirname + "/../resources/destiny/"
            + localeCode + "/DestinyInventoryItemDefinition.json");

        return JSON.parse(raw.toString()) as DestinyInventoryItemDefinition;
    }
}

export default DestinyResourceManager;