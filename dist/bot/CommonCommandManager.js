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
exports.AbstractCommand = void 0;
const fs = __importStar(require("fs"));
const cache_1 = require("./cache");
const requireJson_1 = require("../util/requireJson");
const path_1 = __importDefault(require("path"));
class CommonCommandManager {
    constructor() {
        this.COMMAND_DIR = "./common-commands";
        const discordInfo = requireJson_1.requireJson(__dirname + "/../../resources/discord.json");
        this.commandPrefix = discordInfo["commandPrefix"];
    }
    static get instance() {
        return this._instance;
    }
    async handleCommand(commandName, message) {
        const commands = cache_1.cache.commands;
        for (const command of commands) {
            const cn = command.commandName;
            const ca = command.alias;
            if (commandName.toLowerCase() == cn) {
                await command.execute(message);
                return;
            }
            for (const alias of ca) {
                if (commandName.toLowerCase() == alias) {
                    await command.execute(message);
                    return;
                }
            }
        }
        await message.channel.send(`Please Type Correct Command! (or Try '${this.commandPrefix}help')`);
    }
    async loadCommands() {
        const commandFiles = this.getCommandFiles();
        for (const commandFile of commandFiles) {
            const command = await Promise.resolve().then(() => __importStar(require(this.COMMAND_DIR + "/" + commandFile)));
            const commandInstance = new command.default();
            cache_1.cache.commands.push(commandInstance);
            console.log(`Common Command Loaded: ${commandInstance.commandName}`);
        }
    }
    getCommandFiles() {
        const commandList = fs.readdirSync(path_1.default.resolve(__dirname + "/" + this.COMMAND_DIR));
        return commandList.filter(value => value.endsWith(".js"));
    }
}
CommonCommandManager._instance = new CommonCommandManager();
class AbstractCommand {
}
exports.AbstractCommand = AbstractCommand;
exports.default = CommonCommandManager;
