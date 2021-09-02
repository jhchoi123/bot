import {CommandInteraction} from "discord.js";
import LfgShare from "./share";
import share, {LFG} from "./share";
import LFGManager from "../../../function/LFGManager";

async function doCreate(interaction: CommandInteraction): Promise<void> {
    await interaction.reply({
        content: "Create LFG | LFG 생성"
    });

    if (!interaction.channel) return;
    if (!interaction.guild) return;
    if (!interaction.guild.id) return;

    // title
    const setTitleMessage = await interaction.channel.send({
        embeds: [LfgShare.getTitleSetEmbed()]
    });
    const title = await LfgShare.collectString(interaction, setTitleMessage);
    await setTitleMessage.delete();
    if (title == "\\Canceled\\") {
        await sendCancelMessage(interaction);

        return;
    }

    // description
    const setDescriptionMessage = await interaction.channel.send({
        embeds: [LfgShare.getDescSetEmbed()]
    });
    const description = await LfgShare.collectString(interaction, setDescriptionMessage);
    await setDescriptionMessage.delete();
    if (description == "\\Canceled\\") {
        await sendCancelMessage(interaction);

        return;
    }

    // activity
    let activity = undefined;
    try {
        activity = await share.collectActivity(interaction);
    } catch {
        await sendCancelMessage(interaction);
        return;
    }
    if (!activity) return;

    // date
    const setDateMessage = await interaction.channel.send({
        embeds: [LfgShare.getDateSetEmbed()]
    });

    let date: Date;
    try {
        date = await LfgShare.collectDate(interaction, setDateMessage);
    } catch {
        await sendCancelMessage(interaction);
        return;
    } finally {
        await setDateMessage.delete();
    }
    if (date == undefined) {
        await sendCancelMessage(interaction);
        return;
    }

    const lfg: LFG = {
        title, description, activity, date,
        guildId: interaction.guild.id
    };

    const lfgId = await LFGManager.instance.addNewLfg(lfg, interaction.user.id);

    const createdLfg = await LFGManager.instance.getLfg(lfgId);

    const users = await LFGManager.instance.getLfgUsers(lfgId, interaction.guild.id);

    const lfgEmbed = LfgShare.createLfgEmbed(createdLfg, users);

    const lfgMessage = await interaction.channel.send({
        embeds: [lfgEmbed]
    });
    const buttons = LfgShare.createLfgInteractionButtons(lfgId, lfgMessage.id);
    await lfgMessage.edit({
        components: [buttons]
    });

    if (interaction.channel.isThread()) {
        if (!interaction.channel.parent) return;

        await LFGManager.instance.newLfgMessage(lfgId, {
            guildId: interaction.guild.id,
            channelId: interaction.channel.parent.id,
            messageId: lfgMessage.id,
            isThread: true,
            threadId: interaction.channel.id
        });
    } else {
        await LFGManager.instance.newLfgMessage(lfgId, {
            guildId: interaction.guild.id,
            channelId: interaction.channel.id,
            messageId: lfgMessage.id,
            isThread: false
        });
    }


}

async function sendCancelMessage(interaction: CommandInteraction): Promise<void> {
    await interaction.reply({
        content: "LFG Create Canceled | LFG 생성 취소됨"
    });
}

export default doCreate;