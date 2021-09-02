import {requireJson} from "../util/requireJson";
import LfgDAO from "../db/dao/LfgDAO";
import {promises as fs} from "fs";
import {cache as botCache} from "../bot/cache";
import {Client, TextChannel, ThreadChannel as DiscordThreadChannel} from "discord.js";
import {SecondActionInteraction} from "../bot/handler/interaction/SecondAction";
import LfgShare from "../bot/slash-commands/LfgCommand/share";


class LFGManager {
    private static readonly CACHING_MIN = 10;
    private botClient: Client;

    private constructor() {
        console.log("Initialize LFG Manager");

        this.botClient = botCache.client as Client;

        // when bot rebooted, reload LFG second action handlers to cache
        setTimeout(async () => {
            await this.reloadHandler();
            console.log("LFG Second Action Handler Reloaded");
        }, 1000 * 10);

        // clear time overed LFG
        setInterval(async () => {
            await this.clearOverTimedLFG();
            console.log("TIME OVERED LFG CLEARED");
        }, 1000 * 60 * 30);

        // prevent auto archive LFG thread
        setInterval(async () => {
            await this.keepThreads();
            console.log("SEND THREAD-KEEPING MESSAGE");
        }, 1000 * 60 * 60 * 24);
    }

    private static _instance = new LFGManager();

    public static get instance(): LFGManager {
        return this._instance;
    }

    // LFG
    public async addNewLfg(lfg: LFG, creatorId: string): Promise<number> {
        const dao = new LfgDAO();
        await dao.connect();

        const lfgId = await dao.insertNewLfg(lfg);

        await dao.commit();

        await dao.addUser(lfgId, {
            discordId: creatorId,
            type: "CREATOR"
        });


        let hasThreadChannel = false;
        let threadChannel: ThreadChannel | undefined = undefined;

        const threadChannels = await this.loadThreadChannels();
        for (const c of threadChannels) {
            if (c.guildId == lfg.guildId) {
                hasThreadChannel = true;
                threadChannel = c;
                break;
            }
        }

        if (hasThreadChannel && (threadChannel != undefined)) {
            const guild = await this.botClient.guilds.fetch(threadChannel.guildId);
            const channel = (await guild.channels.fetch(threadChannel.channelId)) as TextChannel;
            const thread = await channel.threads.create({
                name: `${lfgId}-${lfg.title.replace(/ /gi, "-")}`,
                autoArchiveDuration: 1440
            });

            await thread.send(`ID: ${lfgId}\nTITLE: ${lfg.title}\nDESCRIPTION: ${lfg.description}`);
            await thread.send(`ACTIVITY: ${lfg.activity.name} | ${lfg.activity.kr}`);
            await thread.send(`DATE: ${lfg.date.getFullYear()}-${lfg.date.getMonth() + 1}-${lfg.date.getDate()} `
                + `${lfg.date.getHours()}:${lfg.date.getMinutes()}`);
            await thread.send(`CREATOR: <@${creatorId}>`);

            await dao.addLfgThread(lfgId, {
                guildId: guild.id,
                channelId: channel.id,
                threadId: thread.id,
            });
        }

        await dao.commit();
        await dao.close();

        return lfgId;
    }

    public async deleteLfg(lfgId: number) {
        const dao = new LfgDAO();
        await dao.connect();
        let messages: Array<LFGMessage> = [];

        try {
            messages = await dao.getLfgMessages(lfgId);
            if (messages == undefined || messages.length < 1) throw new Error();
        } catch {
        }

        if (messages.length >= 1) {
            const guild = await this.botClient.guilds.fetch(messages[0].guildId);

            for (const message of messages) {
                try {
                    const channel = (await guild.channels.fetch(message.channelId)) as TextChannel;

                    // lfg_i_${lfgId}_[join | alter | leave]_${messageId}
                    await botCache.secondActionHandler.deleteAction(`lfg_i_${lfgId}_join_${message.messageId}`);
                    await botCache.secondActionHandler.deleteAction(`lfg_i_${lfgId}_alter_${message.messageId}`);
                    await botCache.secondActionHandler.deleteAction(`lfg_i_${lfgId}_leave_${message.messageId}`);

                    if (message.isThread) {
                        if (!message.threadId) continue;
                        const thread = await channel.threads.fetch(message.threadId);

                        if (!thread) continue;
                        const messageInstance = await thread.messages.fetch(message.messageId);
                        await messageInstance.delete();
                    } else {
                        const messageInstance = await channel.messages.fetch(message.messageId);
                        await messageInstance.delete();
                    }

                } catch {
                }
            }
        }

        await dao.deleteLfgMessage(lfgId);

        await dao.deleteUsers(lfgId);

        try {
            const thread = await this.getThread(lfgId);
            if (thread == undefined) throw new Error();

            await thread.delete();

            await dao.deleteLfgThread(lfgId);
        } catch {
        }

        await dao.deleteLfg(lfgId);
        await dao.commit();
        await dao.close();
    }

    public async getLfg(lfgId: number) {
        const dao = new LfgDAO();
        await dao.connect();
        const lfg = await dao.queryLfg(lfgId);
        await dao.close();

        return lfg;
    }

    // LFG users
    public async getLfgUsers(lfgId: number, guildId: string) {
        let rawUsers: Array<LFGUser> = [];
        const dao = new LfgDAO();
        try {
            await dao.connect();
            rawUsers = await dao.getUsers(lfgId);
        } catch {
        }
        await dao.close();
        const guild = await this.botClient.guilds.fetch(guildId);

        const users = [];

        for (const rawUser of rawUsers) {
            const member = await guild.members.fetch(rawUser.discordId);
            const userName = member.displayName;
            const userType = rawUser.type;

            users.push({
                userName, userType
            });
        }

        return users;
    }

    // LFG messages
    public async newLfgMessage(lfgId: number, messageInfo: {
        guildId: string,
        channelId: string,
        messageId: string,
        isThread: boolean,
        threadId?: string
    }) {
        await this.setSecondAction(lfgId, messageInfo.messageId);

        const dao = new LfgDAO();
        await dao.connect();
        await dao.addLfgMessage(lfgId, messageInfo);
        await dao.commit();
        await dao.close();
    }

    // LFG threads settings
    public async addThreadChannel(threadChannel: ThreadChannel) {
        const threadChannels = await this.loadThreadChannels();

        let isAlreadyExist = false;

        for (const c of threadChannels) {
            if (c.channelId == threadChannel.channelId && c.guildId == threadChannel.guildId) {
                isAlreadyExist = true;
                break;
            }
        }

        if (!isAlreadyExist) {
            threadChannels.push(threadChannel);
            await this.writeThreadChannels(threadChannels);
        }
    }

    public async deleteThreadChannel(threadChannel: ThreadChannel) {
        let threadChannels = await this.loadThreadChannels();

        let isDeleted = false;
        for (let i = 0; i < threadChannels.length; i++) {
            const c = threadChannels[i];

            if ((c.channelId == threadChannel.channelId) && (c.guildId == threadChannel.guildId)) {
                threadChannels = threadChannels.slice(i, 1);
                isDeleted = true;
                break;
            }
        }

        if (isDeleted) {
            await this.writeThreadChannels(threadChannels);
        }
    }

    // LFG threads
    public async getThread(lfgId: number): Promise<DiscordThreadChannel> {
        const dao = new LfgDAO();
        await dao.connect();
        const threadInfo = await dao.getLfgThread(lfgId);
        await dao.close();

        const guild = await this.botClient.guilds.fetch(threadInfo.guildId);
        const channel = (await guild.channels.fetch(threadInfo.channelId)) as TextChannel;
        const thread = await channel.threads.fetch(threadInfo.threadId);

        if (thread == undefined) throw new Error();

        return thread;
    }

    private async setSecondAction(lfgId: number, messageId: string) {
        await botCache.secondActionHandler.addAction({
            customId: `lfg_i_${lfgId}_join_${messageId}`,
            whenHandled: async (interaction: SecondActionInteraction) => {
                await this.doJoin(lfgId, interaction);
            }
        });
        await botCache.secondActionHandler.addAction({
            customId: `lfg_i_${lfgId}_alter_${messageId}`,
            whenHandled: async (interaction: SecondActionInteraction) => {
                await this.doAlter(lfgId, interaction);
            }
        });
        await botCache.secondActionHandler.addAction({
            customId: `lfg_i_${lfgId}_leave_${messageId}`,
            whenHandled: async (interaction: SecondActionInteraction) => {
                await this.doLeave(lfgId, interaction);
            }
        });
    }

    // LFG interaction processing
    private async doJoin(lfgId: number, interaction: SecondActionInteraction) {
        const userId = interaction.user.id;

        const dao = new LfgDAO();
        await dao.connect();

        let alreadyJoined = false
        let alreadyAltered = false;

        try {
            const lfgUsers = await dao.getUsers(lfgId);

            for (const lfgUser of lfgUsers) {
                if (lfgUser.discordId == userId) {
                    if (lfgUser.type.toLowerCase() == "join") {
                        alreadyJoined = true;
                    } else if (lfgUser.type.toLowerCase() == "alter") {
                        alreadyAltered = true;
                    } else if (lfgUser.type.toLowerCase() == "creator") {
                        alreadyJoined = true;
                    }
                    break;
                }
            }
        } catch {
        }

        if (alreadyJoined) {
            await interaction.reply(`${interaction.user.username}: You Already Joined | 이미 참가하셨습니다`);
            await dao.close();
            return;
        }
        if (alreadyAltered) {
            await dao.deleteOneUser(lfgId, userId);
        }

        await dao.addUser(lfgId, {
            type: "JOIN", discordId: userId
        });

        await this.logToThread(lfgId, userId, "JOIN");

        await dao.commit();
        await dao.close();

        await interaction.reply(`${interaction.user.username} Joined LFG: ${lfgId}`);

        await this.applyChangedUserStat(lfgId);
    }

    private async doAlter(lfgId: number, interaction: SecondActionInteraction) {
        const userId = interaction.user.id;

        const dao = new LfgDAO();
        await dao.connect();

        let alreadyJoined = false
        let alreadyAltered = false;

        try {
            const lfgUsers = await dao.getUsers(lfgId);

            for (const lfgUser of lfgUsers) {
                if (lfgUser.discordId == userId) {
                    if (lfgUser.type.toLowerCase() == "join") {
                        alreadyJoined = true;
                    } else if (lfgUser.type.toLowerCase() == "alter") {
                        alreadyAltered = true;
                    } else if (lfgUser.type.toLowerCase() == "creator") {
                        alreadyJoined = true;
                    }
                    break;
                }
            }
        } catch {
        }


        if (alreadyJoined) {
            await dao.deleteOneUser(lfgId, userId);
        }
        if (alreadyAltered) {
            await interaction
                .reply(`${interaction.user.username}: You Already Altered | 이미 참가유무 불분명으로 참여하셨습니다`);
            await dao.close();
            return;
        }

        await dao.addUser(lfgId, {
            type: "ALTER", discordId: userId
        });

        await this.logToThread(lfgId, userId, "ALTER");

        await dao.commit();
        await dao.close();

        await interaction.reply(`${interaction.user.username} Altered LFG: ${lfgId}`);

        await this.applyChangedUserStat(lfgId);
    }

    private async doLeave(lfgId: number, interaction: SecondActionInteraction) {
        const userId = interaction.user.id;

        const dao = new LfgDAO();
        await dao.connect();

        let alreadyJoined = false
        let alreadyAltered = false;

        try {
            const lfgUsers = await dao.getUsers(lfgId);

            for (const lfgUser of lfgUsers) {
                if (lfgUser.discordId == userId) {
                    if (lfgUser.type.toLowerCase() == "join") {
                        alreadyJoined = true;
                    } else if (lfgUser.type.toLowerCase() == "alter") {
                        alreadyAltered = true;
                    } else if (lfgUser.type.toLowerCase() == "creator") {
                        alreadyJoined = true;
                    }
                    break;
                }
            }
        } catch {
        }

        if ((!alreadyJoined) && (!alreadyAltered)) {
            await interaction.reply(`${interaction.user.username}: You've not Joined | 아직 참가하지 않으셨습니다`);
            await dao.close();
            return;
        }

        await dao.deleteOneUser(lfgId, userId);

        try {
            const threadInfo = await dao.getLfgThread(lfgId);

            const guild = await this.botClient.guilds.fetch(threadInfo.guildId);
            const channel = (await guild.channels.fetch(threadInfo.channelId)) as TextChannel;
            const thread = await channel.threads.fetch(threadInfo.threadId);

            await thread?.members.remove(userId);

        } catch {
        }

        await dao.commit();
        await dao.close();


        await this.logToThread(lfgId, userId, "LEAVE");

        await interaction.reply(`${interaction.user.username} Left LFG: ${lfgId}`);

        await this.applyChangedUserStat(lfgId);
    }

    private async applyChangedUserStat(lfgId: number) {
        const dao = new LfgDAO();
        await dao.connect();
        const messagesInfo = await dao.getLfgMessages(lfgId);
        const lfg = await dao.queryLfg(lfgId);
        await dao.close();

        const users = await this.getLfgUsers(lfgId, messagesInfo[0].guildId);

        const embed = LfgShare.createLfgEmbed(lfg, users);

        const guild = await this.botClient.guilds.fetch(messagesInfo[0].guildId);
        for (const messageInfo of messagesInfo) {
            const channel = (await guild.channels.fetch(messageInfo.channelId)) as TextChannel;

            if (messageInfo.isThread) {
                if (!messageInfo.threadId) continue;
                const thread = await channel.threads.fetch(messageInfo.threadId);
                if (!thread) return;
                const message = await thread.messages.fetch(messageInfo.messageId);

                const buttons = LfgShare.createLfgInteractionButtons(lfgId, message.id);

                await message.edit({
                    embeds: [embed],
                    components: [buttons]
                });
            } else {
                const message = await channel.messages.fetch(messageInfo.messageId);

                const buttons = LfgShare.createLfgInteractionButtons(lfgId, message.id);

                await message.edit({
                    embeds: [embed],
                    components: [buttons]
                });
            }
        }

    }

    private async logToThread(lfgId: number, userId: string, type: string) {
        try {
            const dao = new LfgDAO();
            await dao.connect();
            const threadInfo = await dao.getLfgThread(lfgId);
            await dao.close();

            if (!threadInfo) return;

            const guild = await this.botClient.guilds.fetch(threadInfo.guildId);
            const channel = (await guild.channels.fetch(threadInfo.channelId)) as TextChannel;
            const thread = await channel.threads.fetch(threadInfo.threadId);

            if (!thread) return;

            if (type.toLowerCase() == "leave") {
                const user = await guild.members.fetch(userId);
                await thread.send(`${user.displayName} -> ${type}`);
            } else {
                await thread.send(`<@${userId}> -> ${type}`);
            }
        } catch {
        }

    }

    // get guild's root channel of threads
    private async loadThreadChannels(): Promise<ThreadChannels> {
        const raw = await fs.readFile(__dirname + "/../../resources/lfg-thread-channels.json", {
            encoding: "utf-8"
        });
        return JSON.parse(raw) as ThreadChannels;
    }

    private async writeThreadChannels(threadChannels: ThreadChannels): Promise<void> {
        await fs.writeFile(__dirname + "/../../resources/lfg-thread-channels.json", JSON.stringify(threadChannels), {
            encoding: "utf-8"
        });
    }

    // global lfg management
    private async reloadHandler() {
        const dao = new LfgDAO();
        await dao.connect();

        try {
            const allLFG = await dao.queryAll();

            await botCache.secondActionHandler.clearAction();

            for (const lfg of allLFG) {
                if (!lfg.id) continue;
                try {
                    const messages = await dao.getLfgMessages(lfg.id);
                    //lfg_i_${lfgId}_[join | alter | leave]_${messageId}
                    for (const message of messages) {
                        await botCache.secondActionHandler.addAction({
                            customId: `lfg_i_${lfg.id}_join_${message.messageId}`,
                            whenHandled: async (interaction: SecondActionInteraction) => {
                                if (lfg.id != undefined) {
                                    const lfgId: number = lfg.id;
                                    await this.doJoin(lfgId, interaction);
                                }
                            }
                        });
                        await botCache.secondActionHandler.addAction({
                            customId: `lfg_i_${lfg.id}_alter_${message.messageId}`,
                            whenHandled: async (interaction: SecondActionInteraction) => {
                                if (lfg.id != undefined) {
                                    const lfgId: number = lfg.id;
                                    await this.doAlter(lfgId, interaction);
                                }
                            }
                        });
                        await botCache.secondActionHandler.addAction({
                            customId: `lfg_i_${lfg.id}_leave_${message.messageId}`,
                            whenHandled: async (interaction: SecondActionInteraction) => {
                                if (lfg.id != undefined) {
                                    const lfgId: number = lfg.id;
                                    await this.doLeave(lfgId, interaction);
                                }
                            }
                        });
                    }
                } catch {
                }
            }
        } catch {
        }

        await dao.close();
    }

    private async clearOverTimedLFG() {
        const dao = new LfgDAO();
        await dao.connect();

        try {
            const allLFG = await dao.queryAll();

            const now = new Date();
            for (const lfg of allLFG) {
                if ((lfg.date.getTime() - now.getTime()) < -(1000 * 60 * 30)) {
                    try {
                        if (lfg.id != undefined) await this.deleteLfg(lfg.id);
                    } catch {
                    }
                }
            }
        } catch {
        }

        await dao.close();
    }

    private async keepThreads() {
        const dao = new LfgDAO();
        await dao.connect()

        try {
            const allLfg = await dao.queryAll();

            for (const lfg of allLfg) {
                try {
                    if (lfg.id != undefined) {
                        const threadInfo = await dao.getLfgThread(lfg.id);

                        const guild = await this.botClient.guilds.fetch(threadInfo.guildId);
                        const channel = (await guild.channels.fetch(threadInfo.channelId)) as TextChannel;
                        const thread = await channel.threads.fetch(threadInfo.threadId);

                        if (!thread) continue;

                        await thread.send("Message for Keeping Thread | 스레드 보존 방지용 메세지입니다");
                    }
                } catch {
                }
            }

        } catch {
        }

        await dao.close();
    }
}

type ThreadChannels = ThreadChannel[];

export interface ThreadChannel {
    guildId: string;
    channelId: string;
}

export interface LFG {
    title: string,
    description: string,
    date: Date,
    activity: Activity,
    id?: number,
    guildId: string
}

export interface StringActivityLFG {
    title: string,
    description: string,
    date: Date,
    activity: string,
    id?: number,
    guildId: string
}

export interface Activity {
    name: string,
    kr: string,
    isGroup?: boolean,
    activities?: Array<Activity>
}

export interface LFGMessage {
    lfgId: number,
    guildId: string
    channelId: string,
    messageId: string,
    isThread: boolean,
    threadId?: string
}

export interface LFGThread {
    lfgId: number,
    guildId: string,
    channelId: string,
    threadId: string
}

export interface LFGUser {
    lfgId: number,
    type: string,
    discordId: string
}

export interface NamedLFGUser {
    userName: string,
    userType: string
}

const rawActivity = requireJson(__dirname + "/../../resources/lfg-activity.json");
export const activities: Array<Activity> = rawActivity as Array<Activity>;

export default LFGManager;