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
class BungieAuthDAO {
    constructor() {
        this.connection = new TransactionDBConnection_1.default();
    }
    async connect() {
        await this.connection.connect();
    }
    async close() {
        await this.connection.close();
    }
    async queryAll() {
        const result = await this.connection.execute("SELECT * FROM BUNGIE_AUTH");
        return result.rows;
    }
    async queryByDiscordId(discordId) {
        const result = await this.connection.execute("SELECT * FROM BUNGIE_AUTH WHERE DISCORD_ID = :1", [
            {
                type: TransactionDBConnection_1.STRING,
                val: discordId
            }
        ]);
        return result.rows[0];
    }
    async queryByMembershipId(membershipId) {
        const result = await this.connection.execute("SELECT * FROM BUNGIE_AUTH WHERE MEMBERSHIP_ID = :1", [
            {
                type: TransactionDBConnection_1.STRING,
                val: membershipId
            }
        ]);
        return result.rows[0];
    }
    async insertNewUser(user) {
        await this.connection.execute("INSERT INTO BUNGIE_AUTH VALUES (" +
            ":1, :2, :3, :4, :5, :6, :7, SYSDATE)", [
            { type: TransactionDBConnection_1.STRING, val: user.discordId },
            { type: TransactionDBConnection_1.STRING, val: user.accessToken },
            { type: TransactionDBConnection_1.STRING, val: user.tokenType },
            { type: TransactionDBConnection_1.NUMBER, val: user.expiresIn },
            { type: TransactionDBConnection_1.STRING, val: user.refreshToken },
            { type: TransactionDBConnection_1.NUMBER, val: user.refreshExpiresIn },
            { type: TransactionDBConnection_1.STRING, val: user.membershipId }
        ], {
            autoCommit: true
        });
    }
    async updateUserByDiscordId(user) {
        await this.connection.execute("UPDATE BUNGIE_AUTH" +
            " SET ACCESS_TOKEN = :1," +
            "TOKEN_TYPE = :2," +
            "EXPIRES_IN = :3," +
            "REFRESH_TOKEN = :4," +
            "REFRESH_EXPIRES_IN: :5," +
            "ADDED_DATE = SYSDATE" +
            " WHERE DISCORD_ID = :6", [
            { type: TransactionDBConnection_1.STRING, val: user.accessToken },
            { type: TransactionDBConnection_1.STRING, val: user.tokenType },
            { type: TransactionDBConnection_1.NUMBER, val: user.expiresIn },
            { type: TransactionDBConnection_1.STRING, val: user.refreshToken },
            { type: TransactionDBConnection_1.NUMBER, val: user.refreshExpiresIn },
            { type: TransactionDBConnection_1.STRING, val: user.discordId }
        ], {
            autoCommit: true
        });
    }
    async updateUserByMembershipId(user) {
        await this.connection.execute("UPDATE BUNGIE_AUTH" +
            " SET ACCESS_TOKEN = :1," +
            "TOKEN_TYPE = :2," +
            "EXPIRES_IN = :3," +
            "REFRESH_TOKEN = :4," +
            "REFRESH_EXPIRES_IN: :5," +
            "ADDED_DATE = SYSDATE" +
            " WHERE MEMBERSHIP_ID = :6", [
            { type: TransactionDBConnection_1.STRING, val: user.accessToken },
            { type: TransactionDBConnection_1.STRING, val: user.tokenType },
            { type: TransactionDBConnection_1.NUMBER, val: user.expiresIn },
            { type: TransactionDBConnection_1.STRING, val: user.refreshToken },
            { type: TransactionDBConnection_1.NUMBER, val: user.refreshExpiresIn },
            { type: TransactionDBConnection_1.STRING, val: user.discordId }
        ], {
            autoCommit: true
        });
    }
}
exports.default = BungieAuthDAO;
