"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonDBManager_1 = __importDefault(require("../JsonDBManager"));
class DestinyInventoryItemDefinitionDAO {
    async connect() {
        await JsonDBManager_1.default.instance.connect();
    }
    async close() {
        await JsonDBManager_1.default.instance.close();
    }
    async commit() {
        await JsonDBManager_1.default.instance.commit();
    }
    async insert(definition) {
        console.log("Insert DestinyInventoryItemDefinition to JSON DB...");
        try {
            let collection = await JsonDBManager_1.default.instance
                .getCollection(DestinyInventoryItemDefinitionDAO.COLLECTION_NAME);
            await collection?.drop();
            collection = await JsonDBManager_1.default.instance
                .createCollection(DestinyInventoryItemDefinitionDAO.COLLECTION_NAME);
            const itemHashes = Object.keys(definition);
            for (const itemHash of itemHashes) {
                const targetItemObject = definition[itemHash];
                await collection?.insertOne(targetItemObject);
            }
        }
        catch (e) {
            console.log("Some Error Occurred");
            console.log(e);
        }
        console.log("Successfully Insert DestinyInventoryItemDefinition to JSON DB!");
    }
    async getItemByItemHash(itemHash) {
        const collection = await JsonDBManager_1.default.instance
            .getCollection(DestinyInventoryItemDefinitionDAO.COLLECTION_NAME);
        const doc = await collection?.find().filter({
            "hash": itemHash
        }).getOne();
        if (doc != undefined) {
            return await doc.getContent();
        }
        else {
            throw new Error("There is No Item: " + itemHash);
        }
    }
}
DestinyInventoryItemDefinitionDAO.COLLECTION_NAME = "DESTINY2_INVENTORY_ITEM_DEFINITION";
exports.default = DestinyInventoryItemDefinitionDAO;
