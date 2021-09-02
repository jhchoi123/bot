import {Client} from "discord.js";
import {cache} from "../cache";
import BotPresenceManager from "../BotPresenceManager";

export async function handleReady(client: Client) {
    const botName = client.user?.tag;

    console.log(`Bot Logged In as ${botName}`);

    await cache.commonCommandManager.loadCommands();
    await cache.slashCommandManager.loadCommands();

    BotPresenceManager.loadInstance();
}