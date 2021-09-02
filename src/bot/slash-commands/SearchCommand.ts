import {AbstractSlashCommand} from "../SlashCommandManager";
import {
    ApplicationCommandData,
    CommandInteraction,
    MessageActionRow,
    MessageEmbed,
    MessageSelectMenu,
    SelectMenuInteraction
} from "discord.js";
import BungieAPI from "../../function/BungieAPI";
import {requireJson} from "../../util/requireJson";

const emoji = requireJson(__dirname + "/../../../resources/emoji.json");

class SearchCommand extends AbstractSlashCommand {
    public readonly commandData: ApplicationCommandData;

    public constructor() {
        super();
        this.commandData = {
            name: "검색",
            description: "Search Destiny 2 Item | 데스티니 가디언즈의 아이템을 검색합니다.",
            options: [
                {
                    name: "아이템명",
                    description: "Item Name | 아이템 이름",
                    type: "STRING",
                    required: true
                },
                {
                    name: "언어코드",
                    description: "Locale Code (ex: en, ko...)",
                    type: "STRING",
                    required: false
                }
            ]
        }
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        const rawItemName = interaction.options.get("아이템명");
        const rawLocaleCode = interaction.options.get("언어코드");

        let itemName = "";
        let localeCode = "";

        if (rawItemName == undefined || rawItemName.value == undefined) return;
        itemName = rawItemName.value as string;

        if (rawLocaleCode == undefined || rawLocaleCode.value == undefined || rawLocaleCode.value == "") {
            localeCode = "ko";
        }
        if (rawLocaleCode != undefined && rawLocaleCode.value != undefined && rawLocaleCode.value != "") {
            localeCode = rawLocaleCode.value as string;
        }

        const result = await BungieAPI.instance.api.searchItem(itemName, localeCode);

        if (result == undefined) return;

        let len = 0;
        if (result.length > 9) {
            len = 9;
        } else {
            len = result.length;
        }

        if (len == 0) {
            await interaction.reply("There is no Result | 검색 결과가 없습니다.");
            return;
        }

        // When Result Has Only One Item
        if (len == 1) {
            const resultEmbed = new MessageEmbed();
            resultEmbed.setTitle(result[0].displayProperties.name);
            resultEmbed.setDescription(result[0].displayProperties.description);

            if (result[0].displayProperties.hasIcon) {
                resultEmbed.setThumbnail("https://www.bungie.net" + result[0].displayProperties.icon);
            }
            resultEmbed.setFooter(`Item ID: ${result[0].hash}`);
            resultEmbed.setURL(`https://www.light.gg/db/ko/items/${result[0].hash}`);

            await interaction.reply({
                embeds: [
                    resultEmbed
                ]
            });

            return;
        }


        const resultComponent = new MessageActionRow();
        const resultMenu = new MessageSelectMenu();
        resultMenu.setPlaceholder("Select Item Please | 아이템을 선택해 주세요");
        resultMenu.setCustomId(`${interaction.id}_item_result`);
        for (let i = 0; i < len; i++) {
            const item = result[i];
            resultMenu.addOptions([
                {
                    description: `Item ID: ${item.hash}`,
                    value: `${i}`,
                    label: `${item.displayProperties.name}`
                }
            ]);
        }
        resultComponent.addComponents([resultMenu]);
        await interaction.reply({
            content: `Select Item From Menu | 아래의 메뉴에서 아이템을 선택 해 주세요`,
            components: [resultComponent]
        });

        if (!interaction.channel) return;

        const collectedResult = await interaction.channel.awaitMessageComponent({
            filter: i => i.customId.startsWith(`${interaction.id}_item_result`)
                && (i.user.id == interaction.user.id),
            time: 1000 * 60
        });

        const resultIndex = Number((collectedResult as SelectMenuInteraction).values[0]);

        const targetItem = result[resultIndex];

        const resultEmbed = new MessageEmbed();
        resultEmbed.setTitle(targetItem.displayProperties.name);
        resultEmbed.setDescription(targetItem.displayProperties.description);

        if (targetItem.displayProperties.hasIcon) {
            resultEmbed.setThumbnail("https://www.bungie.net" + targetItem.displayProperties.icon);
        }

        resultEmbed.setFooter(`Item ID: ${targetItem.hash}`);
        resultEmbed.setURL(`https://www.light.gg/db/ko/items/${targetItem.hash}`);
        await collectedResult.reply({
            embeds: [resultEmbed]
        });

        return;
    }
}

export default SearchCommand;