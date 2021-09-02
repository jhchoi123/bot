import {CommandInteraction} from "discord.js";
import LFGManager, {NamedLFGUser, StringActivityLFG} from "../../../function/LFGManager";
import LfgShare from "./share";

async function doShow(interaction: CommandInteraction, id: number) {
    if (!interaction.channel) return;
    if (!interaction.guild) return;

    const manager = LFGManager.instance;

    let isExistLfg = false;

    let lfg: StringActivityLFG | undefined = undefined;
    let users: Array<NamedLFGUser> = [];

    try {
        lfg = await manager.getLfg(id);
        users = await manager.getLfgUsers(id, interaction.guild.id);
        if (lfg != undefined) isExistLfg = true;
    } catch (e) {
        isExistLfg = false;
    }

    if (!isExistLfg) {
        await interaction.reply({
            content: `LFG ID: ${id}\n`
                + "Not Exist LFG | 존재하지 않는 LFG입니다"
        });
        return;
    }

    if (lfg == undefined) return;
    if (users == undefined) return;

    await interaction.reply("Pull LFG | LFG 정보");
    const lfgMessage = await interaction.channel.send({
        embeds: [LfgShare.createLfgEmbed(lfg, users)]
    });

    await lfgMessage.edit({
        components: [LfgShare.createLfgInteractionButtons(id, lfgMessage.id)]
    });

    if (interaction.channel.isThread()) {
        if (!interaction.channel.parent) return;

        await manager.newLfgMessage(id, {
            guildId: interaction.guild.id,
            channelId: interaction.channel.parent.id,
            messageId: lfgMessage.id,
            isThread: false,
            threadId: interaction.channel.id
        });
    } else {
        await manager.newLfgMessage(id, {
            guildId: interaction.guild.id,
            channelId: interaction.channel.id,
            messageId: lfgMessage.id,
            isThread: false
        });
    }
}

export default doShow;