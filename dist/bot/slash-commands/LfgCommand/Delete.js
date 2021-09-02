"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const LFGManager_1 = __importDefault(require("../../../function/LFGManager"));
async function doDelete(interaction, id) {
    if (!interaction.channel)
        return;
    const manager = LFGManager_1.default.instance;
    let isExistLfg = false;
    try {
        const lfg = await manager.getLfg(id);
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
    await interaction.reply({
        content: `LFG ID: ${id}\n`
            + "Are You Sure to Delete LFG? | 정말로 LFG를 삭제할까요?",
        components: [new discord_js_1.MessageActionRow().addComponents([
                new discord_js_1.MessageButton().setLabel("O").setStyle("PRIMARY")
                    .setCustomId(`${interaction.id}_lfg_delete_${id}_yes`),
                new discord_js_1.MessageButton().setLabel("X").setStyle("DANGER")
                    .setCustomId(`${interaction.id}_lfg_delete_${id}_no`)
            ])]
    });
    const yn = await interaction.channel.awaitMessageComponent({
        filter: i => i.customId.startsWith(`${interaction.id}_lfg_delete_${id}_`)
            && i.user.id == interaction.user.id,
        time: 1000 * 60
    });
    if (!yn.customId.endsWith("yes")) {
        await yn.reply("Delete Canceled | 취소되었습니다");
        return;
    }
    else {
        await manager.deleteLfg(id);
        await yn.reply("LFG Successfully Deleted | 삭제되었습니다");
        return;
    }
}
exports.default = doDelete;
