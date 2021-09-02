"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LFGManager_1 = __importDefault(require("../../../function/LFGManager"));
const share_1 = __importDefault(require("./share"));
async function doShow(interaction, id) {
    if (!interaction.channel)
        return;
    if (!interaction.guild)
        return;
    const manager = LFGManager_1.default.instance;
    let isExistLfg = false;
    let lfg = undefined;
    let users = [];
    try {
        lfg = await manager.getLfg(id);
        users = await manager.getLfgUsers(id, interaction.guild.id);
        if (lfg != undefined)
            isExistLfg = true;
    }
    catch (e) {
        isExistLfg = false;
    }
    if (!isExistLfg) {
        await interaction.reply({
            content: `LFG ID: ${id}\n`
                + "Not Exist LFG | 존재하지 않는 LFG입니다"
        });
        return;
    }
    if (lfg == undefined)
        return;
    if (users == undefined)
        return;
    await interaction.reply("Pull LFG | LFG 정보");
    const lfgMessage = await interaction.channel.send({
        embeds: [share_1.default.createLfgEmbed(lfg, users)]
    });
    await lfgMessage.edit({
        components: [share_1.default.createLfgInteractionButtons(id, lfgMessage.id)]
    });
    if (interaction.channel.isThread()) {
        if (!interaction.channel.parent)
            return;
        await manager.newLfgMessage(id, {
            guildId: interaction.guild.id,
            channelId: interaction.channel.parent.id,
            messageId: lfgMessage.id,
            isThread: false,
            threadId: interaction.channel.id
        });
    }
    else {
        await manager.newLfgMessage(id, {
            guildId: interaction.guild.id,
            channelId: interaction.channel.id,
            messageId: lfgMessage.id,
            isThread: false
        });
    }
}
exports.default = doShow;
