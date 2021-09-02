"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommonCommandManager_1 = require("../CommonCommandManager");
const discord_js_1 = require("discord.js");
const cache_1 = require("../cache");
class HelpCommand extends CommonCommandManager_1.AbstractCommand {
    constructor() {
        super();
        this.commandName = "help";
        this.alias = [
            "도움말",
            "명령어",
            "command",
            "commands"
        ];
        this.description = "See All Commands\n"
            + "모든 명령어를 표시합니다.\n"
            + `"${cache_1.cache.commandPrefix}help" or "${cache_1.cache.commandPrefix}help [command name (명령어명)]"`;
    }
    async execute(message) {
        const args = message.content.split(" ");
        const commands = cache_1.cache.commands;
        const embed = new discord_js_1.MessageEmbed();
        if (args.length >= 2 && args[1] != "") {
            let targetCommand = undefined;
            for (const command of commands) {
                if (args[1] == command.commandName) {
                    targetCommand = command;
                    break;
                }
                else {
                    let aliasFlag = false;
                    for (const alias of command.alias) {
                        if (args[1] == alias) {
                            targetCommand = command;
                            aliasFlag = true;
                            break;
                        }
                    }
                    if (aliasFlag) {
                        break;
                    }
                }
            }
            if (targetCommand == undefined) {
                await message.channel.send("Type Correct Command Name | 올바른 명령어명을 입력해 주세요\n"
                    + `${cache_1.cache.commandPrefix}help [command name (명령어명)]`);
                return;
            }
            else {
                const embed = new discord_js_1.MessageEmbed().setTitle(targetCommand.commandName);
                embed.setDescription(targetCommand.description);
                let aliasFooter = "Alias : ";
                for (const alias of targetCommand.alias) {
                    aliasFooter = aliasFooter + alias + " ";
                }
                if (aliasFooter != "Alias : ") {
                    embed.setFooter(aliasFooter);
                }
                await message.channel.send({
                    embeds: [embed]
                });
                return;
            }
        }
        else {
            embed.setTitle("HELP | 도움말");
            let content = "";
            for (const command of commands) {
                content = content + command.commandName + "\t";
            }
            embed.setDescription(content);
            await message.channel.send({
                embeds: [embed]
            });
            return;
        }
    }
}
exports.default = HelpCommand;
