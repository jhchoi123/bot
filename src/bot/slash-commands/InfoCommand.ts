import {AbstractSlashCommand} from "../SlashCommandManager";
import {ApplicationCommandData, CommandInteraction} from "discord.js";
import doAdd from "./InfoCommand/Add";
import doShow from "./InfoCommand/Show";
import doDelete from "./InfoCommand/Delete";

class InfoCommand extends AbstractSlashCommand {
    public readonly commandData: ApplicationCommandData = {
        name: "info",
        description: "[show | add | delete] information | 정보를 [표시 | 등록 | 삭제]합니다",
        options: [
            {
                type: "SUB_COMMAND",
                name: "add",
                description: "add new information | 정보를 등록합니다",
                options: [
                    {
                        required: true,
                        name: "name",
                        description: "Name of Information | 정보명",
                        type: "STRING"
                    },
                    {
                        required: true,
                        name: "id",
                        description: "Message ID | 정보가 적힌 메세지 ID",
                        type: "STRING"
                    }
                ]
            },
            {
                type: "SUB_COMMAND",
                name: "show",
                description: "show information | 정보를 표시합니다",
                options: [
                    {
                        required: false,
                        name: "name",
                        type: "STRING",
                        description: "information name | 정보명"
                    }
                ]
            },
            {
                type: "SUB_COMMAND",
                name: "delete",
                description: "delete information | 정보를 삭제합니다",
                options: [
                    {
                        required: true,
                        name: "name",
                        type: "STRING",
                        description: "information name | 정보명"
                    }
                ]
            }
        ]
    };

    public constructor() {
        super();
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand.toLowerCase() == "add") {
            await doAdd(interaction);
        } else if (subCommand.toLowerCase() == "show") {
            await doShow(interaction);
        } else if (subCommand.toLowerCase() == "delete") {
            await doDelete(interaction);
        }
    }
}