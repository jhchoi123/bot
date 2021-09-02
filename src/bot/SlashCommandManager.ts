import {ApplicationCommandData, CommandInteraction} from "discord.js";
import * as fs from "fs";
import {cache} from "./cache";
import path from "path";

class SlashCommandManager {
    private static readonly _instance: SlashCommandManager = new SlashCommandManager();
    private readonly COMMAND_DIR = "./slash-commands";

    private constructor() {
    }

    public static get instance(): SlashCommandManager {
        return this._instance;
    }

    public async handleCommand(commandName: string, interaction: CommandInteraction) {
        const command = cache.slashCommands.get(commandName);
        if (command == undefined) return;

        await command.execute(interaction);
    }

    public async loadCommands(): Promise<void> {
        const commandFiles = this.getCommandFiles();

        for (const commandFile of commandFiles) {
            const command = await import(this.COMMAND_DIR + "/" + commandFile);
            const commandInstance: AbstractSlashCommand = new command.default();
            cache.slashCommands.set(commandInstance.commandData.name, commandInstance);
            console.log(`Slash Command Loaded: ${commandInstance.commandData.name}`);
        }
    }

    private getCommandFiles(): Array<string> {
        const commandList = fs.readdirSync(path.resolve(__dirname + "/" + this.COMMAND_DIR));

        return commandList.filter(value => value.endsWith(".js"));
    }
}

abstract class AbstractSlashCommand {
    public readonly abstract commandData: ApplicationCommandData;

    public abstract execute(interaction: CommandInteraction): Promise<void>;
}

export {AbstractSlashCommand};
export default SlashCommandManager;