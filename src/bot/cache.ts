import CommonCommandManager, {AbstractCommand} from "./CommonCommandManager";
import {requireJson} from "../util/requireJson";
import SlashCommandManager, {AbstractSlashCommand} from "./SlashCommandManager";
import SecondActionHandler from "./handler/interaction/SecondActionHandler";
import {Client} from "discord.js";

const botInfo = requireJson(__dirname + "/../../resources/discord.json");

export const cache: BotCache = {
    client: undefined,
    commonCommandManager: CommonCommandManager.instance,
    commandPrefix: botInfo["commandPrefix"] as string,
    commands: new Array<AbstractCommand>(),
    slashCommandManager: SlashCommandManager.instance,
    slashCommands: new Map<string, AbstractSlashCommand>(),
    secondActionHandler: SecondActionHandler.instance
};


interface BotCache {
    commonCommandManager: CommonCommandManager,
    commandPrefix: string,
    commands: Array<AbstractCommand>,
    slashCommandManager: SlashCommandManager,
    slashCommands: Map<string, AbstractSlashCommand>,
    client?: Client,
    secondActionHandler: SecondActionHandler
}