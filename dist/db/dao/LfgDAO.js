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
const oracledb_1 = require("oracledb");
class LfgDAO {
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
    // LFG
    async queryLfg(id) {
        const result = await this.connection.execute("SELECT * FROM LFG WHERE ID = :1", [
            { type: TransactionDBConnection_1.NUMBER, val: id }
        ]);
        if (result == undefined) {
            throw new Error();
        }
        if (result.rows == undefined) {
            throw new Error();
        }
        if (result.rows?.length == 0) {
            throw new Error();
        }
        const data = result.rows[0];
        return {
            id: data[0],
            title: data[1],
            activity: data[2],
            date: data[3],
            description: data[4],
            guildId: data[5]
        };
    }
    async queryAll() {
        const rawResult = await this.connection.execute("SELECT * FROM LFG");
        if (rawResult == undefined)
            throw new Error();
        if (rawResult.rows == undefined)
            throw new Error();
        if (rawResult.rows.length <= 0)
            throw new Error();
        let lfgAll = [];
        for (const rawLfg of rawResult.rows) {
            const id = rawLfg[0];
            const title = rawLfg[1];
            const activity = rawLfg[2];
            const date = rawLfg[3];
            const description = rawLfg[4];
            const guildId = rawLfg[5];
            lfgAll.push({
                id, title, activity, date, description, guildId
            });
        }
        return lfgAll;
    }
    async insertNewLfg(lfg) {
        const id = await this.generateNewId();
        try {
            await this.connection.execute("INSERT INTO LFG VALUES (:1, :2, :3, :4, :5, :6)", [
                { type: TransactionDBConnection_1.NUMBER, val: id },
                { type: TransactionDBConnection_1.STRING, val: lfg.title },
                { type: TransactionDBConnection_1.STRING, val: `${lfg.activity.name} | ${lfg.activity.kr}` },
                { type: oracledb_1.DATE, val: lfg.date },
                { type: TransactionDBConnection_1.STRING, val: lfg.description },
                { type: TransactionDBConnection_1.STRING, val: lfg.guildId }
            ]);
        }
        catch (e) {
            console.log(e);
            throw new Error("Failed to Create New LFG...");
        }
        console.log(id);
        return id;
    }
    async deleteLfg(id) {
        try {
            await this.connection.execute("DELETE FROM LFG WHERE id = :1", [
                { type: TransactionDBConnection_1.NUMBER, val: id }
            ]);
        }
        catch (e) {
            console.log(e);
            console.log("Failed to Delete LFG: " + id);
        }
    }
    // LFG messages
    async addLfgMessage(lfgId, messageInfo) {
        try {
            if (messageInfo.isThread) {
                await this.connection
                    .execute("INSERT INTO LFG_MESSAGES VALUES (:1, :2, :3, :4, :5, :6)", [
                    { type: TransactionDBConnection_1.NUMBER, val: lfgId },
                    { type: TransactionDBConnection_1.STRING, val: messageInfo.guildId },
                    { type: TransactionDBConnection_1.STRING, val: messageInfo.channelId },
                    { type: TransactionDBConnection_1.STRING, val: messageInfo.messageId },
                    { type: TransactionDBConnection_1.NUMBER, val: +messageInfo.isThread },
                    { type: TransactionDBConnection_1.STRING, val: messageInfo.threadId }
                ]);
            }
            else {
                await this.connection
                    .execute("INSERT INTO LFG_MESSAGES(LFG_ID, GUILD_ID, CHANNEL_ID, MESSAGE_ID, IS_THREAD_MESSAGE) " +
                    "VALUES (:1, :2, :3, :4, :5)", [
                    { type: TransactionDBConnection_1.NUMBER, val: lfgId },
                    { type: TransactionDBConnection_1.STRING, val: messageInfo.guildId },
                    { type: TransactionDBConnection_1.STRING, val: messageInfo.channelId },
                    { type: TransactionDBConnection_1.STRING, val: messageInfo.messageId },
                    { type: TransactionDBConnection_1.NUMBER, val: +messageInfo.isThread }
                ]);
            }
        }
        catch (e) {
            console.log(e);
            throw new Error("Failed to Create Add New LFG Message...");
        }
    }
    async deleteLfgMessage(lfgId) {
        try {
            await this.connection.execute("DELETE FROM LFG_MESSAGES WHERE LFG_ID = :1", [
                { type: TransactionDBConnection_1.NUMBER, val: lfgId }
            ]);
        }
        catch (e) {
            console.log(e);
            throw new Error("Failed to Delete LFG Messages...");
        }
    }
    async getLfgMessages(lfgId) {
        const messages = new Array();
        try {
            const rawResult = await this.connection
                .execute("SELECT * FROM LFG_MESSAGES WHERE LFG_ID = :1", [
                { type: TransactionDBConnection_1.NUMBER, val: lfgId }
            ]);
            if (rawResult == undefined)
                throw new Error();
            if (rawResult.rows == undefined)
                throw new Error();
            if (rawResult.rows.length <= 0)
                throw new Error();
            for (const rawMessage of rawResult.rows) {
                const isThread = rawMessage[4] != 0;
                let message;
                if (isThread) {
                    message = {
                        lfgId: rawMessage[0],
                        guildId: rawMessage[1],
                        channelId: rawMessage[2],
                        messageId: rawMessage[3],
                        isThread: rawMessage[4],
                        threadId: rawMessage[5]
                    };
                }
                else {
                    message = {
                        lfgId: rawMessage[0],
                        guildId: rawMessage[1],
                        channelId: rawMessage[2],
                        messageId: rawMessage[3],
                        isThread: rawMessage[4]
                    };
                }
                messages.push(message);
            }
        }
        catch (e) {
            console.log(e);
            throw new Error("Failed to Load LFG Messages");
        }
        return messages;
    }
    // LFG threads
    async addLfgThread(lfgId, threadInfo) {
        try {
            await this.connection
                .execute("INSERT INTO LFG_LOG_CHANNEL VALUES (:1, :2, :3, :4)", [
                { type: TransactionDBConnection_1.NUMBER, val: lfgId },
                { type: TransactionDBConnection_1.STRING, val: threadInfo.guildId },
                { type: TransactionDBConnection_1.STRING, val: threadInfo.channelId },
                { type: TransactionDBConnection_1.STRING, val: threadInfo.threadId }
            ]);
        }
        catch (e) {
            console.log(e);
            throw new Error("Failed to Add Lfg Thread...");
        }
    }
    async deleteLfgThread(lfgId) {
        try {
            await this.connection
                .execute("DELETE FROM LFG_LOG_CHANNEL WHERE LFG_ID = :1", [
                { type: TransactionDBConnection_1.NUMBER, val: lfgId }
            ]);
        }
        catch (e) {
            console.log(e);
            throw new Error("Failed to Delete LFG Thread...");
        }
    }
    async getLfgThread(lfgId) {
        let thread;
        try {
            const rawResult = await this.connection
                .execute("SELECT * FROM LFG_LOG_CHANNEL WHERE LFG_ID = :1", [
                { type: TransactionDBConnection_1.NUMBER, val: lfgId }
            ]);
            if (rawResult == undefined)
                throw new Error();
            if (rawResult.rows == undefined)
                throw new Error();
            if (rawResult.rows.length <= 0)
                throw new Error();
            const rawThreadInfo = rawResult.rows[0];
            thread = {
                lfgId: rawThreadInfo[0],
                guildId: rawThreadInfo[1],
                channelId: rawThreadInfo[2],
                threadId: rawThreadInfo[3]
            };
        }
        catch (e) {
            console.log(e);
            throw new Error("Failed to Load LFG Thread...");
        }
        return thread;
    }
    // LFg users
    async addUser(lfgId, userInfo) {
        console.log(lfgId);
        console.log(userInfo.type);
        console.log(userInfo.discordId);
        try {
            await this.connection
                .execute("INSERT INTO LFG_USERS VALUES (:1, :2, :3)", [
                { type: TransactionDBConnection_1.NUMBER, val: lfgId },
                { type: TransactionDBConnection_1.STRING, val: userInfo.type },
                { type: TransactionDBConnection_1.STRING, val: userInfo.discordId }
            ]);
        }
        catch (e) {
            console.log(e);
            throw new Error("Failed to Add New User to LFG...");
        }
    }
    async deleteOneUser(lfgId, userDiscordId) {
        try {
            await this.connection
                .execute("DELETE FROM LFG_USERS WHERE (LFG_ID = :1) AND (DISCORD_ID = :2)", [
                { type: TransactionDBConnection_1.NUMBER, val: lfgId },
                { type: TransactionDBConnection_1.STRING, val: userDiscordId }
            ]);
        }
        catch (e) {
            console.log(e);
            throw new Error("Failed to Delete User From LFG...");
        }
    }
    async deleteUsers(lfgId) {
        try {
            await this.connection
                .execute("DELETE FROM LFG_USERS WHERE LFG_ID = :1", [
                { type: TransactionDBConnection_1.NUMBER, val: lfgId }
            ]);
        }
        catch (e) {
            console.log(e);
            throw new Error("Failed to Delete Users...");
        }
    }
    async getUsers(lfgId) {
        const users = new Array();
        try {
            const rawResult = await this.connection
                .execute("SELECT * FROM LFG_USERS WHERE LFG_ID = :1", [
                { type: TransactionDBConnection_1.NUMBER, val: lfgId }
            ]);
            if (rawResult == undefined)
                throw new Error();
            if (rawResult.rows == undefined)
                throw new Error();
            if (rawResult.rows.length <= 0)
                throw new Error();
            for (const rawUser of rawResult.rows) {
                const user = {
                    lfgId: rawUser[0],
                    type: rawUser[1],
                    discordId: rawUser[2]
                };
                users.push(user);
            }
        }
        catch (e) {
            throw new Error("Failed to Load LFG Users...");
        }
        return users;
    }
    async generateNewId() {
        let generatedId = 0;
        let isAlreadyUsedId = true;
        while (true) {
            generatedId = this.random();
            try {
                const lfg = await this.queryLfg(generatedId);
                isAlreadyUsedId = lfg != undefined;
            }
            catch {
                isAlreadyUsedId = false;
            }
            if (!isAlreadyUsedId) {
                break;
            }
        }
        return generatedId;
    }
    random() {
        return Math.floor((Math.random() * 998) + 1);
    }
}
exports.default = LfgDAO;
