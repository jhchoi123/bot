import {AbstractSlashCommand} from "../SlashCommandManager";
import {ApplicationCommandData, CommandInteraction} from "discord.js";
import doCreate from "./LfgCommand/Create";
import doDelete from "./LfgCommand/Delete";
import doShow from "./LfgCommand/Show";

class LfgCommand extends AbstractSlashCommand {
    readonly commandData: ApplicationCommandData;

    public constructor() {
        super();
        this.commandData = {
            name: "파티모집",
            description: "Looking for Group",
            options: [
                {
                    name: "생성",
                    description: "Create LFG | 파티모집을 생성합니다.",
                    type: "SUB_COMMAND"
                },
                {
                    name: "삭제",
                    description: "Delete LFG | 파티모집을 삭제합니다.",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "id",
                            description: "LFG ID | 파티모집 ID",
                            type: "INTEGER",
                            required: true
                        }
                    ]
                },
                {
                    name: "표시",
                    description: "Show LFG Information | 파티모집 정보를 표시합니다.",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "id",
                            description: "LFG ID | 파티모집 ID",
                            type: "INTEGER",
                            required: true
                        }
                    ]
                }
            ]
        }
    }


    async execute(interaction: CommandInteraction): Promise<void> {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand == "생성") {
            await doCreate(interaction);
        } else {
            const data = interaction.options.get("id");
            const rawValue = data?.value;
            if (!rawValue) return;

            const lfgId = Number(rawValue);

            if (subcommand == "삭제") {
                await doDelete(interaction, lfgId);
            } else if (subcommand == "표시") {
                await doShow(interaction, lfgId);
            }
        }
    }
}

export default LfgCommand;