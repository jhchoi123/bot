"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oracledb_1 = require("oracledb");
const requireJson_1 = require("../util/requireJson");
const connectionInfo = requireJson_1.requireJson(__dirname + "/../../resources/db/connection.json");
class OracleConnector {
    constructor() {
        oracledb_1.initOracleClient({
            // libDir: D:\Development\OracleInstantClient_19_11
            libDir: "/home/ubuntu/instantclient_21_1"
        });
        (async () => {
            this.transactionPool = await oracledb_1.createPool({
                user: connectionInfo.transactionDB.userName,
                password: connectionInfo.transactionDB.password,
                connectString: connectionInfo.transactionDB.connectionString
            });
            console.log("Transaction Pool Opened");
            this.jsonPool = await oracledb_1.createPool({
                user: connectionInfo.jsonDB.userName,
                password: connectionInfo.jsonDB.password,
                connectString: connectionInfo.transactionDB.connectionString
            });
            console.log("Json Pool Opened");
        })();
    }
    static get instance() {
        return this._instance;
    }
    async getTransactionConnection() {
        if (this.transactionPool == undefined) {
            throw new Error();
        }
        return await this.transactionPool.getConnection();
    }
    async getJsonConnection() {
        if (this.jsonPool == undefined) {
            throw new Error();
        }
        return await this.jsonPool.getConnection();
    }
}
OracleConnector._instance = new OracleConnector();
exports.default = OracleConnector;
