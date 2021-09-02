"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const share_1 = __importDefault(require("./share"));
const share_2 = __importDefault(require("./share"));
const LFGManager_1 = __importDefault(require("../../../function/LFGManager"));
async function doCreate(interaction) {
    await interaction.reply({
        content: "Create LFG | LFG 생성"
    });
    if (!interaction.channel)
        return;
    if (!interaction.guild)
        return;
    if (!interaction.guild.id)
        return;
    // title
    const setTitleMessage = await interaction.channel.send({
        embeds: [share_1.default.getTitleSetEmbed()]
    });
    const title = await share_1.default.collectString(interaction, setTitleMessage);
    await setTitleMessage.delete();
    if (title == "\\Canceled\\") {
        await sendCancelMessage(interaction);
        return;
    }
    // description
    const setDescriptionMessage = await interaction.channel.send({
        embeds: [share_1.default.getDescSetEmbed()]
    });
    const description = await share_1.default.collectString(interaction, setDescriptionMessage);
    await setDescriptionMessage.delete();
    if (description == "\\Canceled\\") {
        await sendCancelMessage(interaction);
        return;
    }
    // activity
    let activity = undefined;
    try {
        activity = await share_2.default.collectActivity(interaction);
    }
    catch {
        await sendCancelMessage(interaction);
        return;
    }
    if (!activity)
        return;
    // date
    const setDateMessage = await interaction.channel.send({
        embeds: [share_1.default.getDateSetEmbed()]
    });
    let date;
    try {
        date = await share_1.default.collectDate(interaction, setDateMessage);
    }
    catch {
        await sendCancelMessage(interaction);
        return;
    }
    finally {
        await setDateMessage.delete();
    }
    if (date == undefined) {
        await sendCancelMessage(interaction);
        return;
    }
    const lfg = {
        title, description, activity, date,
        guildId: interaction.guild.id
    };
    const lfgId = await LFGManager_1.default.instance.addNewLfg(lfg, interaction.user.id);
    const createdLfg = await LFGManager_1.default.instance.getLfg(lfgId);
    const users = await LFGManager_1.default.instance.getLfgUsers(lfgId, interaction.guild.id);
    const lfgEmbed = share_1.default.createLfgEmbed(createdLfg, users);
    const lfgMessage = await interaction.channel.send({
        embeds: [lfgEmbed]
    });
    const buttons = share_1.default.createLfgInteractionButtons(lfgId, lfgMessage.id);
    await lfgMessage.edit({
        components: [buttons]
    });
    if (interaction.channel.isThread()) {
        if (!interaction.channel.parent)
            return;
        await LFGManager_1.default.instance.newLfgMessage(lfgId, {
            guildId: interaction.guild.id,
            channelId: interaction.channel.parent.id,
            messageId: lfgMessage.id,
            isThread: true,
            threadId: interaction.channel.id
        });
    }
    else {
        await LFGManager_1.default.instance.newLfgMessage(lfgId, {
            guildId: interaction.guild.id,
            channelId: interaction.channel.id,
            messageId: lfgMessage.id,
            isThread: false
        });
    }
}
async function sendCancelMessage(interaction) {
    await interaction.reply({
        content: "LFG Create Canceled | LFG 생성 취소됨"
    });
}
exports.default = doCreate;
