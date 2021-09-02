import {AbstractSlashCommand} from "../SlashCommandManager";
import {ApplicationCommandData, CommandInteraction, MessageEmbed} from "discord.js";
import BungieOAuthManager from "../../function/BungieOAuthManager";

class RegisterCommand extends AbstractSlashCommand {
    public readonly commandData: ApplicationCommandData;

    public constructor() {
        super();
        this.commandData = {
            name: "가입",
            description: "Register for More Bungie API Features | 더 많은 번지 API 기능을 위해 가입합니다. <아직 미사용 기능입니다>"
        }
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.reply(`<@${interaction.user.id}> \nCheck Your DM for Register\n`
            + "가입을 위해 DM을 확인해 주세요.");

        const url = await BungieOAuthManager.instance.addStateQueueAndGetUrl(interaction.user.id);

        const embed = new MessageEmbed();
        embed.setTitle("Click Here for Registration | 이곳을 눌러 가입을 진행해 주세요.");
        embed.setURL(url);

        const dmChannel = await interaction.user.createDM();
        await dmChannel.send({
            embeds: [embed]
        });
    }
}

export default RegisterCommand;