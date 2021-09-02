"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NUMBER = exports.STRING = void 0;
const OracleConnector_1 = __importDefault(require("./OracleConnector"));
class JsonDBManager {
    constructor() {
    }
    static get instance() {
        return this.managerInstance;
    }
    async connect() {
        console.log("Creating DB Connection...");
        this.connection = await (OracleConnector_1.default.instance.getJsonConnection());
        this.jsonDb = this.connection.getSodaDatabase();
        console.log("JSON DB Connected!");
    }
    async close() {
        if (this.connection == undefined) {
            throw new Error("JSON DB Connection didn't Connected");
        }
        return this.connection?.close();
    }
    async commit() {
        if (this.connection == undefined) {
            throw new Error("JSON DB Connection didn't Connected");
        }
        return this.connection.commit();
    }
    async createCollection(collectionName, options) {
        let createdCollection;
        if (options != undefined) {
            createdCollection = await this.jsonDb?.createCollection(collectionName, options);
        }
        else {
            createdCollection = await this.jsonDb?.createCollection(collectionName);
        }
        return createdCollection;
    }
    async getCollection(collectionName) {
        return await this.jsonDb?.openCollection(collectionName);
    }
}
JsonDBManager.managerInstance = new JsonDBManager();
var oracledb_1 = require("oracledb");
Object.defineProperty(exports, "STRING", { enumerable: true, get: function () { return oracledb_1.STRING; } });
Object.defineProperty(exports, "NUMBER", { enumerable: true, get: function () { return oracledb_1.NUMBER; } });
exports.default = JsonDBManager;
