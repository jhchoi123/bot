"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSlashCommand = void 0;
const fs = __importStar(require("fs"));
const cache_1 = require("./cache");
const path_1 = __importDefault(require("path"));
class SlashCommandManager {
    constructor() {
        this.COMMAND_DIR = "./slash-commands";
    }
    static get instance() {
        return this._instance;
    }
    async handleCommand(commandName, interaction) {
        const command = cache_1.cache.slashCommands.get(commandName);
        if (command == undefined)
            return;
        await command.execute(interaction);
    }
    async loadCommands() {
        const commandFiles = this.getCommandFiles();
        for (const commandFile of commandFiles) {
            const command = await Promise.resolve().then(() => __importStar(require(this.COMMAND_DIR + "/" + commandFile)));
            const commandInstance = new command.default();
            cache_1.cache.slashCommands.set(commandInstance.commandData.name, commandInstance);
            console.log(`Slash Command Loaded: ${commandInstance.commandData.name}`);
        }
    }
    getCommandFiles() {
        const commandList = fs.readdirSync(path_1.default.resolve(__dirname + "/" + this.COMMAND_DIR));
        return commandList.filter(value => value.endsWith(".js"));
    }
}
SlashCommandManager._instance = new SlashCommandManager();
class AbstractSlashCommand {
}
exports.AbstractSlashCommand = AbstractSlashCommand;
exports.default = SlashCommandManager;
