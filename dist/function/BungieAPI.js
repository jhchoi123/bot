"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BungieAPIWrapper_1 = __importDefault(require("../bungie/BungieAPIWrapper"));
const fs_1 = __importDefault(require("fs"));
const DestinyInventoryItemDefinitionDAO_1 = __importDefault(require("../db/dao/DestinyInventoryItemDefinitionDAO"));
const BungieMembershipType_1 = __importDefault(require("../bungie/Entities/BungieMembershipType"));
const requireJson_1 = require("../util/requireJson");
const bungieInfo = requireJson_1.requireJson(__dirname + "/../../resources/bungie.json");
class UsingApi {
    constructor() {
        console.log("Initialize Bungie API...");
    }
    static get instance() {
        return this._instance;
    }
    get api() {
        return this._api;
    }
    set api(api) {
        this._api = api;
    }
    async searchItem(itemName, localeCode) {
        if (this.api == undefined)
            return;
        const endpoint = this.api.Destiny2.SearchDestinyEntities;
        let response;
        if (localeCode != "en") {
            response = await endpoint.execute({
                type: "DestinyInventoryItemDefinition",
                searchTerm: itemName,
                lc: localeCode
            });
        }
        else {
            response = await endpoint.execute({
                type: "DestinyInventoryItemDefinition",
                searchTerm: itemName
            });
        }
        return response.Response.results.results;
    }
    async getDestinyMemberships(membershipId) {
        if (this.api == undefined)
            return;
        const endpoint = this.api.User.GetMembershipDataById;
        const response = await endpoint.execute({
            membershipId: membershipId,
            membershipType: BungieMembershipType_1.default.All
        });
        return response.Response.destinyMemberships;
    }
}
UsingApi._instance = new UsingApi();
class BungieAPI {
    constructor() {
        this.apiKey = bungieInfo.apiKey;
        this.oAuthClientId = bungieInfo.oAuthClientId;
        this.oAuthClientSecret = bungieInfo.oAuthClientSecret;
        this.isSecret = bungieInfo.isSecret;
        this.apiWrapper = new BungieAPIWrapper_1.default(this.apiKey, this.isSecret, this.oAuthClientId, this.oAuthClientSecret);
        this._api = UsingApi.instance;
        this._api.api = this.apiWrapper;
    }
    static get instance() {
        return this._instance;
    }
    get api() {
        return this._api;
    }
    async downloadManifest() {
        console.log("Download Destiny2 Manifest...");
        const endpoint = this.apiWrapper.Destiny2.GetDestinyManifest;
        const result = await endpoint.execute();
        const manifest = result.Response;
        await fs_1.default.promises.writeFile(`${__dirname}/../resources/destiny/manifest.json`, JSON.stringify(manifest))
            .then(() => console.log("Successfully Downloaded Destiny 2 Manifest!")).catch(err => {
            console.log(err);
        });
    }
    async getItem(hash) {
        const dao = new DestinyInventoryItemDefinitionDAO_1.default();
        let result;
        try {
            await dao.connect();
            result = await dao.getItemByItemHash(hash);
        }
        catch (e) {
            throw new Error(e);
        }
        finally {
            try {
                await dao.close();
            }
            catch (e) {
                console.log("Failed to Close DAO");
                console.log(e);
            }
        }
        return result;
    }
    async getDestinyMemberships(membershipId) {
    }
}
BungieAPI._instance = new BungieAPI();
exports.default = BungieAPI;
