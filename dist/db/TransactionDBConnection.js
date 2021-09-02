"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NUMBER = exports.STRING = void 0;
const OracleConnector_1 = __importDefault(require("./OracleConnector"));
class TransactionDBConnection {
    constructor() {
    }
    async connect() {
        console.log("Creating Transaction DB Connection...");
        this.connection = await (OracleConnector_1.default.instance.getTransactionConnection());
        console.log("Transaction DB Connected!");
    }
    async close() {
        if (this.connection == undefined) {
            throw new Error("Transaction DB Connection didn't Connected");
        }
        return this.connection?.close();
    }
    async commit() {
        await this.connection?.commit();
    }
    async execute(sql, bindParameters, options) {
        if (this.connection == undefined) {
            throw new Error("Transaction DB Connection didn't Connected");
        }
        let result;
        if (bindParameters != undefined && options != undefined) {
            result = this.connection?.execute(sql, bindParameters, options);
        }
        else if (bindParameters != undefined) {
            result = this.connection?.execute(sql, bindParameters);
        }
        else {
            result = this.connection?.execute(sql);
        }
        if (result == undefined) {
            return new class {
            };
        }
        else {
            return result;
        }
    }
    async executeMany(sql, binds, options) {
        if (this.connection == undefined) {
            throw new Error("Transaction DB Connection didn't Connected");
        }
        let result;
        if (options != undefined) {
            result = this.connection?.executeMany(sql, binds, options);
        }
        else {
            result = this.connection?.executeMany(sql, binds);
        }
        if (result == undefined) {
            return new class {
            };
        }
        else {
            return result;
        }
    }
}
var oracledb_1 = require("oracledb");
Object.defineProperty(exports, "STRING", { enumerable: true, get: function () { return oracledb_1.STRING; } });
Object.defineProperty(exports, "NUMBER", { enumerable: true, get: function () { return oracledb_1.NUMBER; } });
exports.default = TransactionDBConnection;
