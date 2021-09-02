"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommonCommandManager_1 = require("../CommonCommandManager");
const cache_1 = require("../cache");
const LFGManager_1 = __importDefault(require("../../function/LFGManager"));
class LfgThreadCommand extends CommonCommandManager_1.AbstractCommand {
    constructor() {
        super();
        this.commandName = "lfg-thread";
        this.description = "Setting LFG Thread\n"
            + "LFG 스레드를 설정합니다.\n"
            + `${cache_1.cache.commandPrefix}thread [add | delete]`;
        this.alias = [
            "스레드"
        ];
    }
    async execute(message) {
        if (!message.guild)
            return;
        const rawMessage = message.content;
        const args = rawMessage.split(" ");
        if (args.length < 2 || args[1] == "") {
            await message.channel.send("Please Type Options | 옵션을 넣어주세요\n"
                + `${cache_1.cache.commandPrefix}${this.commandName} [add | delete]`);
            return;
        }
        try {
            if (args[1].toLowerCase() == "add") {
                await LFGManager_1.default.instance.addThreadChannel({
                    guildId: message.guild?.id,
                    channelId: message.channel.id
                });
                await message.delete();
                await message.channel.send("Set This Channel to LFG Thread Root Channel | 현재 채널을 LFG 스레드 루트로 설정합니다");
            }
            else if (args[1].toLowerCase() == "delete") {
                await LFGManager_1.default.instance.deleteThreadChannel({
                    guildId: message.guild.id,
                    channelId: message.channel.id
                });
                await message.delete();
                await message.channel.send("Delete This Channel from Thread Root Channel | 현재 채널을 LFG 스레드 루트에서 삭제합니다");
            }
            else {
                await message.channel.send("Please Type Correct Options | 올바른 옵션을 넣어주세요\n"
                    + `${cache_1.cache.commandPrefix}${this.commandName} [add | delete]`);
                return;
            }
        }
        catch (e) {
            await message.channel.send("Some Error Occurred... Please Try Again | 오류가 일어났습니다... 잠시 뒤에 재시도해 주세요.");
            return;
        }
    }
}
exports.default = LfgThreadCommand;
