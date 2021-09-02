import * as fs from "fs";
import {Message} from "discord.js";
import {cache} from "./cache";
import {requireJson} from "../util/requireJson";
import path from "path";

class CommonCommandManager {
    private static readonly _instance = new CommonCommandManager();
    private readonly COMMAND_DIR = "./common-commands";
    private readonly commandPrefix: string;

    private constructor() {
        const discordInfo = requireJson(__dirname + "/../../resources/discord.json");
        this.commandPrefix = discordInfo["commandPrefix"];
    }

    public static get instance(): CommonCommandManager {
        return this._instance;
    }

    public async handleCommand(commandName: string, message: Message) {
        const commands = cache.commands;

        for (const command of commands) {
            const cn = command.commandName;
            const ca = command.alias;

            if (commandName.toLowerCase() == cn) {
                await command.execute(message);
                return;
            }

            for (const alias of ca) {
                if (commandName.toLowerCase() == alias) {
                    await command.execute(message);
                    return;
                }
            }
        }

        await message.channel.send(`Please Type Correct Command! (or Try '${this.commandPrefix}help')`);
    }

    public async loadCommands() {
        const commandFiles = this.getCommandFiles();

        for (const commandFile of commandFiles) {
            const command = await import(this.COMMAND_DIR + "/" + commandFile);
            const commandInstance: AbstractCommand = new command.default();
            cache.commands.push(commandInstance);
            console.log(`Common Command Loaded: ${commandInstance.commandName}`);
        }
    }

    private getCommandFiles(): Array<string> {
        const commandList = fs.readdirSync(path.resolve(__dirname + "/" + this.COMMAND_DIR));

        return commandList.filter(value => value.endsWith(".js"));
    }
}

abstract class AbstractCommand {
    public readonly abstract commandName: string;
    public readonly abstract alias: Array<string>;
    public readonly abstract description: string;

    public abstract execute(message: Message): Promise<void>;
}

export {AbstractCommand};
export default CommonCommandManager;
