import {Client, Message} from "discord.js";
import {cache} from "../cache";

export function handleMessage(client: Client, message: Message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(cache.commandPrefix)) return;

    const rawMessage = message.content;
    const args = rawMessage.split(" ");
    const commandName = args[0].replace(cache.commandPrefix, "");

    cache.commonCommandManager.handleCommand(commandName, message);
}