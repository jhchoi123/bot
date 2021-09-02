"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommonCommandManager_1 = require("../CommonCommandManager");
const cache_1 = require("../cache");
class SlashCommand extends CommonCommandManager_1.AbstractCommand {
    constructor() {
        super();
        this.commandName = "slash";
        this.description = "Setting Slash Command\n"
            + "슬래시 커맨드를 활성화/비활성화 합니다.\n"
            + `${cache_1.cache.commandPrefix}slash [on | off]`;
        this.alias = [
            "slashes",
            "슬래시",
            "빗금"
        ];
    }
    async execute(message) {
        const rawMessage = message.content;
        const args = rawMessage.split(" ");
        if (args.length < 2 || args[1] == "") {
            await message.channel.send("Please Type Options | 옵션을 넣어주세요\n"
                + `${cache_1.cache.commandPrefix}${this.commandName} [on | off]`);
            return;
        }
        try {
            if (args[1].toLowerCase() == "on") {
                if (message.guild?.id == undefined) {
                    throw new Error("Failed to Get Guild ID");
                }
                await this.turnOnSlashCommand(message.guild.commands, message.guild.id);
                await message.channel.send("Turn on Slash Command | 슬래시 커맨드를 활성화합니다.");
            }
            else if (args[1].toLowerCase() == "off") {
                if (message.guild?.id == undefined) {
                    throw new Error("Failed to Get Guild ID");
                }
                await this.turnOffSlashCommand(message.guild.commands, message.guild.id);
                await message.channel.send("Turn off Slash Command | 슬래시 커맨드를 비활성화 합니다.");
                return;
            }
            else {
                await message.channel.send("Please Type Correct Options | 올바른 옵션을 넣어주세요\n"
                    + `${cache_1.cache.commandPrefix}${this.commandName} [on | off]`);
                return;
            }
        }
        catch {
            await message.channel.send("Some Error Occurred... Please Try Again | 오류가 일어났습니다... 잠시 뒤에 재시도해 주세요.");
            return;
        }
    }
    async turnOnSlashCommand(commandManager, guildId) {
        const commands = cache_1.cache.slashCommands;
        commands.forEach(async (value) => {
            await commandManager.create(value.commandData);
        });
    }
    async turnOffSlashCommand(commandManager, guildId) {
        const allCommands = await commandManager?.fetch();
        if (allCommands != undefined) {
            const commandIds = allCommands.keys();
            for (const commandId of commandIds) {
                const targetCommand = allCommands.get(commandId);
                if (targetCommand != undefined && targetCommand.guild != undefined) {
                    const commandGuildId = targetCommand.guild.id;
                    if (commandGuildId.toString() == guildId) {
                        await commandManager.delete(commandId);
                        console.log(`Delete Slash Command: ${targetCommand.name} (${targetCommand.id}) `
                            + `from ${targetCommand.guild.name} (${targetCommand.guild.id})`);
                    }
                }
            }
        }
    }
}
exports.default = SlashCommand;
