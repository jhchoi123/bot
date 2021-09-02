import JsonDBManager from "../JsonDBManager";
import {DestinyInventoryItemDefinition} from "../../bungie/Entities/Destiny/Definitions/DestinyInventoryItemDefinition";
import {StringDictionary} from "../../bungie/share/Dictionary";

class DestinyInventoryItemDefinitionDAO {
    private static readonly COLLECTION_NAME = "DESTINY2_INVENTORY_ITEM_DEFINITION";

    public async connect(): Promise<void> {
        await JsonDBManager.instance.connect();
    }

    public async close(): Promise<void> {
        await JsonDBManager.instance.close();
    }

    public async commit(): Promise<void> {
        await JsonDBManager.instance.commit();
    }

    public async insert(definition: StringDictionary<DestinyInventoryItemDefinition>): Promise<void> {
        console.log("Insert DestinyInventoryItemDefinition to JSON DB...");

        try {
            let collection = await JsonDBManager.instance
                .getCollection(DestinyInventoryItemDefinitionDAO.COLLECTION_NAME);

            await collection?.drop();

            collection = await JsonDBManager.instance
                .createCollection(DestinyInventoryItemDefinitionDAO.COLLECTION_NAME);

            const itemHashes = Object.keys(definition);

            for (const itemHash of itemHashes) {
                const targetItemObject = definition[itemHash];
                await collection?.insertOne(targetItemObject);
            }
        } catch (e) {
            console.log("Some Error Occurred");
            console.log(e);
        }

        console.log("Successfully Insert DestinyInventoryItemDefinition to JSON DB!");
    }

    public async getItemByItemHash(itemHash: string): Promise<DestinyInventoryItemDefinition> {
        const collection = await JsonDBManager.instance
            .getCollection(DestinyInventoryItemDefinitionDAO.COLLECTION_NAME);

        const doc = await collection?.find().filter({
            "hash": itemHash
        }).getOne();

        if (doc != undefined) {
            return await doc.getContent() as DestinyInventoryItemDefinition;
        } else {
            throw new Error("There is No Item: " + itemHash);
        }
    }
}

export default DestinyInventoryItemDefinitionDAO;