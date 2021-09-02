import fs from "fs";
import {DestinyManifest} from "../../bungie/Entities/Destiny/Config/DestinyManifest";

class DestinyManifestDAO {
    private constructor() {
    }

    public static async getDestinyManifest(): Promise<DestinyManifest> {
        const rawManifest = await fs.promises.readFile(__dirname + "/../../resources/destiny/manifest.json");

        return JSON.parse(rawManifest.toString()) as DestinyManifest;
    }
}

export default DestinyManifestDAO;