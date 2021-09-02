"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SlashCommandManager_1 = require("../SlashCommandManager");
const Add_1 = __importDefault(require("./InfoCommand/Add"));
const Show_1 = __importDefault(require("./InfoCommand/Show"));
const Delete_1 = __importDefault(require("./InfoCommand/Delete"));
class InfoCommand extends SlashCommandManager_1.AbstractSlashCommand {
    constructor() {
        super();
        this.commandData = {
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
    }
    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();
        if (subCommand.toLowerCase() == "add") {
            await Add_1.default(interaction);
        }
        else if (subCommand.toLowerCase() == "show") {
            await Show_1.default(interaction);
        }
        else if (subCommand.toLowerCase() == "delete") {
            await Delete_1.default(interaction);
        }
    }
}
