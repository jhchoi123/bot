"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SlashCommandManager_1 = require("../SlashCommandManager");
const discord_js_1 = require("discord.js");
const BungieOAuthManager_1 = __importDefault(require("../../function/BungieOAuthManager"));
class RegisterCommand extends SlashCommandManager_1.AbstractSlashCommand {
    constructor() {
        super();
        this.commandData = {
            name: "가입",
            description: "Register for More Bungie API Features | 더 많은 번지 API 기능을 위해 가입합니다. <아직 미사용 기능입니다>"
        };
    }
    async execute(interaction) {
        await interaction.reply(`<@${interaction.user.id}> \nCheck Your DM for Register\n`
            + "가입을 위해 DM을 확인해 주세요.");
        const url = await BungieOAuthManager_1.default.instance.addStateQueueAndGetUrl(interaction.user.id);
        const embed = new discord_js_1.MessageEmbed();
        embed.setTitle("Click Here for Registration | 이곳을 눌러 가입을 진행해 주세요.");
        embed.setURL(url);
        const dmChannel = await interaction.user.createDM();
        await dmChannel.send({
            embeds: [embed]
        });
    }
}
exports.default = RegisterCommand;
