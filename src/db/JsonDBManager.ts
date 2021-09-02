import {Connection, SodaCollection, SodaCollectionOptions, SodaDatabase} from "oracledb";
import OracleConnector from "./OracleConnector";

class JsonDBManager {
    private static managerInstance: JsonDBManager = new JsonDBManager();
    private connection?: Connection;
    private jsonDb?: SodaDatabase;

    private constructor() {
    }

    public static get instance(): JsonDBManager {
        return this.managerInstance;
    }

    public async connect(): Promise<void> {
        console.log("Creating DB Connection...")
        this.connection = await (OracleConnector.instance.getJsonConnection());
        this.jsonDb = this.connection.getSodaDatabase();
        console.log("JSON DB Connected!")
    }

    public async close(): Promise<void> {
        if (this.connection == undefined) {
            throw new Error("JSON DB Connection didn't Connected");
        }

        return this.connection?.close();
    }

    public async commit(): Promise<void> {
        if (this.connection == undefined) {
            throw new Error("JSON DB Connection didn't Connected");
        }

        return this.connection.commit();
    }

    public async createCollection(collectionName: string, options?: SodaCollectionOptions): Promise<SodaCollection | undefined> {
        let createdCollection: SodaCollection | undefined;

        if (options != undefined) {
            createdCollection = await this.jsonDb?.createCollection(collectionName, options);
        } else {
            createdCollection = await this.jsonDb?.createCollection(collectionName);
        }

        return createdCollection;
    }

    public async getCollection(collectionName: string): Promise<SodaCollection | undefined> {
        return await this.jsonDb?.openCollection(collectionName);
    }
}

export {STRING, NUMBER} from 'oracledb';

export default JsonDBManager;