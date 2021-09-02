import BungieAPIWrapper from "../bungie/BungieAPIWrapper";
import fs from "fs";
import {DestinyInventoryItemDefinition} from "../bungie/Entities/Destiny/Definitions/DestinyInventoryItemDefinition";
import DestinyInventoryItemDefinitionDAO from "../db/dao/DestinyInventoryItemDefinitionDAO";
import BungieMembershipType from "../bungie/Entities/BungieMembershipType";
import {requireJson} from "../util/requireJson";

const bungieInfo = requireJson(__dirname + "/../../resources/bungie.json");

class UsingApi {
    private static readonly _instance = new UsingApi();

    private constructor() {
        console.log("Initialize Bungie API...");
    }

    public static get instance(): UsingApi {
        return this._instance;
    }

    private _api: BungieAPIWrapper | undefined;

    public get api(): BungieAPIWrapper | undefined {
        return this._api;
    }

    public set api(api: BungieAPIWrapper | undefined) {
        this._api = api;
    }

    public async searchItem(itemName: string, localeCode: string) {
        if (this.api == undefined) return;
        const endpoint = this.api.Destiny2.SearchDestinyEntities;

        let response;

        if (localeCode != "en") {
            response = await endpoint.execute({
                type: "DestinyInventoryItemDefinition",
                searchTerm: itemName,
                lc: localeCode
            });
        } else {
            response = await endpoint.execute({
                type: "DestinyInventoryItemDefinition",
                searchTerm: itemName
            });
        }

        return response.Response.results.results;
    }

    public async getDestinyMemberships(membershipId: string) {
        if (this.api == undefined) return;
        const endpoint = this.api.User.GetMembershipDataById;

        const response = await endpoint.execute({
            membershipId: membershipId,
            membershipType: BungieMembershipType.All
        });

        return response.Response.destinyMemberships;
    }
}

class BungieAPI {
    private readonly apiKey: string = bungieInfo.apiKey;
    private readonly oAuthClientId: number = bungieInfo.oAuthClientId;
    private readonly oAuthClientSecret: string | undefined = bungieInfo.oAuthClientSecret;
    private readonly isSecret: boolean = bungieInfo.isSecret;
    private readonly apiWrapper: BungieAPIWrapper
        = new BungieAPIWrapper(this.apiKey, this.isSecret, this.oAuthClientId, this.oAuthClientSecret);
    private readonly _api: UsingApi = UsingApi.instance;

    private constructor() {
        this._api.api = this.apiWrapper;
    }

    private static _instance: BungieAPI = new BungieAPI();

    public static get instance(): BungieAPI {
        return this._instance
    }

    public get api(): UsingApi {
        return this._api;
    }

    public async downloadManifest(): Promise<void> {
        console.log("Download Destiny2 Manifest...");
        const endpoint = this.apiWrapper.Destiny2.GetDestinyManifest;
        const result = await endpoint.execute();

        const manifest = result.Response;

        await fs.promises.writeFile(`${__dirname}/../resources/destiny/manifest.json`, JSON.stringify(manifest))
            .then(() => console.log("Successfully Downloaded Destiny 2 Manifest!")).catch(err => {
                console.log(err);
            });
    }

    public async getItem(hash: string): Promise<DestinyInventoryItemDefinition> {
        const dao = new DestinyInventoryItemDefinitionDAO();

        let result: DestinyInventoryItemDefinition;
        try {
            await dao.connect();
            result = await dao.getItemByItemHash(hash);
        } catch (e) {
            throw new Error(e);
        } finally {
            try {
                await dao.close();
            } catch (e) {
                console.log("Failed to Close DAO");
                console.log(e);
            }
        }
        return result;
    }

    public async getDestinyMemberships(membershipId: string) {

    }
}


export default BungieAPI;