"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SlashCommandManager_1 = require("../SlashCommandManager");
const Create_1 = __importDefault(require("./LfgCommand/Create"));
const Delete_1 = __importDefault(require("./LfgCommand/Delete"));
const Show_1 = __importDefault(require("./LfgCommand/Show"));
class LfgCommand extends SlashCommandManager_1.AbstractSlashCommand {
    constructor() {
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
        };
    }
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand == "생성") {
            await Create_1.default(interaction);
        }
        else {
            const data = interaction.options.get("id");
            const rawValue = data?.value;
            if (!rawValue)
                return;
            const lfgId = Number(rawValue);
            if (subcommand == "삭제") {
                await Delete_1.default(interaction, lfgId);
            }
            else if (subcommand == "표시") {
                await Show_1.default(interaction, lfgId);
            }
        }
    }
}
exports.default = LfgCommand;
