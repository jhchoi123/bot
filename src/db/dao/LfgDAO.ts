import TransactionDBConnection, {NUMBER, STRING} from "../TransactionDBConnection";
import {LFG, LFGMessage, LFGThread, LFGUser, StringActivityLFG} from "../../function/LFGManager";
import {DATE} from "oracledb";

class LfgDAO {
    private connection: TransactionDBConnection = new TransactionDBConnection();

    public constructor() {
    }

    public async connect(): Promise<void> {
        await this.connection.connect();
    }

    public async close(): Promise<void> {
        await this.connection.close();
    }

    public async commit(): Promise<void> {
        await this.connection.commit();
    }

    // LFG
    public async queryLfg(id: number): Promise<StringActivityLFG> {
        const result = await this.connection.execute("SELECT * FROM LFG WHERE ID = :1", [
            {type: NUMBER, val: id}
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

        const data = result.rows[0] as Array<any>;

        return {
            id: data[0] as number,
            title: data[1] as string,
            activity: data[2] as string,
            date: data[3] as Date,
            description: data[4] as string,
            guildId: data[5] as string
        }
    }

    public async queryAll(): Promise<Array<StringActivityLFG>> {
        const rawResult = await this.connection.execute("SELECT * FROM LFG");

        if (rawResult == undefined) throw new Error();
        if (rawResult.rows == undefined) throw new Error();
        if (rawResult.rows.length <= 0) throw new Error();

        let lfgAll = [];

        for (const rawLfg of rawResult.rows as Array<Array<any>>) {
            const id = rawLfg[0] as number;
            const title = rawLfg[1] as string;
            const activity = rawLfg[2] as string;
            const date = rawLfg[3] as Date;
            const description = rawLfg[4] as string;
            const guildId = rawLfg[5] as string;

            lfgAll.push({
                id, title, activity, date, description, guildId
            });
        }

        return lfgAll;
    }

    public async insertNewLfg(lfg: LFG): Promise<number> {
        const id = await this.generateNewId();

        try {
            await this.connection.execute("INSERT INTO LFG VALUES (:1, :2, :3, :4, :5, :6)", [
                {type: NUMBER, val: id},
                {type: STRING, val: lfg.title},
                {type: STRING, val: `${lfg.activity.name} | ${lfg.activity.kr}`},
                {type: DATE, val: lfg.date},
                {type: STRING, val: lfg.description},
                {type: STRING, val: lfg.guildId}
            ]);
        } catch (e) {
            console.log(e);
            throw new Error("Failed to Create New LFG...");
        }

        console.log(id);

        return id;
    }

    public async deleteLfg(id: number): Promise<void> {
        try {
            await this.connection.execute("DELETE FROM LFG WHERE id = :1", [
                {type: NUMBER, val: id}
            ]);
        } catch (e) {
            console.log(e);
            console.log("Failed to Delete LFG: " + id);
        }
    }

    // LFG messages
    public async addLfgMessage(lfgId: number, messageInfo: {
        guildId: string,
        channelId: string,
        messageId: string
        isThread: boolean,
        threadId?: string
    }) {
        try {

            if (messageInfo.isThread) {
                await this.connection
                    .execute("INSERT INTO LFG_MESSAGES VALUES (:1, :2, :3, :4, :5, :6)", [
                        {type: NUMBER, val: lfgId},
                        {type: STRING, val: messageInfo.guildId},
                        {type: STRING, val: messageInfo.channelId},
                        {type: STRING, val: messageInfo.messageId},
                        {type: NUMBER, val: +messageInfo.isThread},
                        {type: STRING, val: messageInfo.threadId}
                    ]);
            } else {
                await this.connection
                    .execute("INSERT INTO LFG_MESSAGES(LFG_ID, GUILD_ID, CHANNEL_ID, MESSAGE_ID, IS_THREAD_MESSAGE) " +
                        "VALUES (:1, :2, :3, :4, :5)", [
                        {type: NUMBER, val: lfgId},
                        {type: STRING, val: messageInfo.guildId},
                        {type: STRING, val: messageInfo.channelId},
                        {type: STRING, val: messageInfo.messageId},
                        {type: NUMBER, val: +messageInfo.isThread}
                    ]);
            }
        } catch (e) {
            console.log(e);
            throw new Error("Failed to Create Add New LFG Message...");
        }
    }

    public async deleteLfgMessage(lfgId: number) {
        try {
            await this.connection.execute("DELETE FROM LFG_MESSAGES WHERE LFG_ID = :1", [
                {type: NUMBER, val: lfgId}
            ]);
        } catch (e) {
            console.log(e);
            throw new Error("Failed to Delete LFG Messages...");
        }
    }

    public async getLfgMessages(lfgId: number): Promise<Array<LFGMessage>> {
        const messages = new Array<LFGMessage>();
        try {
            const rawResult = await this.connection
                .execute("SELECT * FROM LFG_MESSAGES WHERE LFG_ID = :1", [
                    {type: NUMBER, val: lfgId}
                ]);

            if (rawResult == undefined) throw new Error();
            if (rawResult.rows == undefined) throw new Error();
            if (rawResult.rows.length <= 0) throw new Error();

            for (const rawMessage of rawResult.rows as Array<Array<any>>) {
                const isThread = (rawMessage[4] as number) != 0;

                let message;
                if (isThread) {
                    message = {
                        lfgId: rawMessage[0] as number,
                        guildId: rawMessage[1] as string,
                        channelId: rawMessage[2] as string,
                        messageId: rawMessage[3] as string,
                        isThread: rawMessage[4] as boolean,
                        threadId: rawMessage[5] as string
                    }
                } else {
                    message = {
                        lfgId: rawMessage[0] as number,
                        guildId: rawMessage[1] as string,
                        channelId: rawMessage[2] as string,
                        messageId: rawMessage[3] as string,
                        isThread: rawMessage[4] as boolean
                    }
                }

                messages.push(message);
            }
        } catch (e) {
            console.log(e);
            throw new Error("Failed to Load LFG Messages");
        }

        return messages;
    }

    // LFG threads
    public async addLfgThread(lfgId: number, threadInfo: {
        guildId: string,
        channelId: string,
        threadId: string
    }) {
        try {
            await this.connection
                .execute("INSERT INTO LFG_LOG_CHANNEL VALUES (:1, :2, :3, :4)", [
                    {type: NUMBER, val: lfgId},
                    {type: STRING, val: threadInfo.guildId},
                    {type: STRING, val: threadInfo.channelId},
                    {type: STRING, val: threadInfo.threadId}
                ]);
        } catch (e) {
            console.log(e);
            throw new Error("Failed to Add Lfg Thread...");
        }
    }

    public async deleteLfgThread(lfgId: number) {
        try {
            await this.connection
                .execute("DELETE FROM LFG_LOG_CHANNEL WHERE LFG_ID = :1", [
                    {type: NUMBER, val: lfgId}
                ]);
        } catch (e) {
            console.log(e);
            throw new Error("Failed to Delete LFG Thread...");
        }
    }

    public async getLfgThread(lfgId: number): Promise<LFGThread> {
        let thread: LFGThread;
        try {
            const rawResult = await this.connection
                .execute("SELECT * FROM LFG_LOG_CHANNEL WHERE LFG_ID = :1", [
                    {type: NUMBER, val: lfgId}
                ]);

            if (rawResult == undefined) throw new Error();
            if (rawResult.rows == undefined) throw new Error();
            if (rawResult.rows.length <= 0) throw new Error();

            const rawThreadInfo = rawResult.rows[0] as Array<any>;
            thread = {
                lfgId: rawThreadInfo[0] as number,
                guildId: rawThreadInfo[1] as string,
                channelId: rawThreadInfo[2] as string,
                threadId: rawThreadInfo[3] as string
            }
        } catch (e) {
            console.log(e);
            throw new Error("Failed to Load LFG Thread...");
        }

        return thread;
    }

    // LFg users
    public async addUser(lfgId: number, userInfo: {
        type: string,
        discordId: string
    }) {
        console.log(lfgId);
        console.log(userInfo.type);
        console.log(userInfo.discordId);
        try {
            await this.connection
                .execute("INSERT INTO LFG_USERS VALUES (:1, :2, :3)", [
                    {type: NUMBER, val: lfgId},
                    {type: STRING, val: userInfo.type},
                    {type: STRING, val: userInfo.discordId}
                ]);
        } catch (e) {
            console.log(e);
            throw new Error("Failed to Add New User to LFG...");
        }
    }

    public async deleteOneUser(lfgId: number, userDiscordId: string) {
        try {
            await this.connection
                .execute("DELETE FROM LFG_USERS WHERE (LFG_ID = :1) AND (DISCORD_ID = :2)", [
                    {type: NUMBER, val: lfgId},
                    {type: STRING, val: userDiscordId}
                ]);
        } catch (e) {
            console.log(e);
            throw new Error("Failed to Delete User From LFG...");
        }
    }

    public async deleteUsers(lfgId: number) {
        try {
            await this.connection
                .execute("DELETE FROM LFG_USERS WHERE LFG_ID = :1", [
                    {type: NUMBER, val: lfgId}
                ]);
        } catch (e) {
            console.log(e);
            throw new Error("Failed to Delete Users...");
        }
    }

    public async getUsers(lfgId: number): Promise<Array<LFGUser>> {
        const users = new Array<LFGUser>();
        try {
            const rawResult = await this.connection
                .execute("SELECT * FROM LFG_USERS WHERE LFG_ID = :1", [
                    {type: NUMBER, val: lfgId}
                ]);

            if (rawResult == undefined) throw new Error();
            if (rawResult.rows == undefined) throw new Error();
            if (rawResult.rows.length <= 0) throw new Error();

            for (const rawUser of rawResult.rows as Array<Array<any>>) {
                const user = {
                    lfgId: rawUser[0] as number,
                    type: rawUser[1] as string,
                    discordId: rawUser[2] as string
                }
                users.push(user);
            }
        } catch (e) {
            throw new Error("Failed to Load LFG Users...");
        }

        return users;
    }

    private async generateNewId(): Promise<number> {
        let generatedId = 0;
        let isAlreadyUsedId = true;
        while (true) {
            generatedId = this.random();
            try {
                const lfg = await this.queryLfg(generatedId);

                isAlreadyUsedId = lfg != undefined;

            } catch {
                isAlreadyUsedId = false;
            }

            if (!isAlreadyUsedId) {
                break;
            }
        }

        return generatedId;
    }

    private random(): number {
        return Math.floor((Math.random() * 998) + 1);
    }
}

export default LfgDAO;