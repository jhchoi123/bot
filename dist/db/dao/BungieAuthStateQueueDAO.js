"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionDBConnection_1 = __importStar(require("../TransactionDBConnection"));
class BungieAuthStateQueueDAO {
    constructor() {
        this.connection = new TransactionDBConnection_1.default();
    }
    async connect() {
        await this.connection.connect();
    }
    async close() {
        await this.connection.close();
    }
    async commit() {
        await this.connection.commit();
    }
    async queryAll() {
        const result = await this.connection.execute("SELECT * FROM BUNGIE_AUTH_STATE_QUEUE");
        return result.rows;
    }
    async queryByDiscordId(discordId) {
        const result = await this.connection
            .execute("SELECT * FROM BUNGIE_AUTH_STATE_QUEUE WHERE DISCORD_ID = :1", [
            { type: TransactionDBConnection_1.STRING, val: discordId }
        ]);
        return result.rows[0];
    }
    async queryByState(state) {
        const result = await this.connection
            .execute("SELECT * FROM BUNGIE_AUTH_STATE_QUEUE WHERE STATE = :1", [
            { type: TransactionDBConnection_1.STRING, val: state }
        ]);
        console.log(result);
        return result.rows[0];
    }
    async insertNewQueue(stateQueue) {
        await this.connection
            .execute("INSERT INTO BUNGIE_AUTH_STATE_QUEUE VALUES (:1, :2, SYSDATE)", [
            { type: TransactionDBConnection_1.STRING, val: stateQueue.discordId },
            { type: TransactionDBConnection_1.STRING, val: stateQueue.state }
        ]);
    }
    async deleteQueueByDiscordId(discordId) {
        await this.connection
            .execute("DELETE FROM BUNGIE_AUTH_STATE_QUEUE WHERE DISCORD_ID = :1", [
            { type: TransactionDBConnection_1.STRING, val: discordId }
        ]);
    }
    async deleteQueueByState(state) {
        await this.connection
            .execute("DELETE FROM BUNGIE_AUTH_STATE_QUEUE WHERE STATE = :1", [
            { type: TransactionDBConnection_1.STRING, val: state }
        ]);
    }
}
exports.default = BungieAuthStateQueueDAO;
