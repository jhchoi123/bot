"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const CommonCommandManager_1 = __importDefault(require("./CommonCommandManager"));
const requireJson_1 = require("../util/requireJson");
const SlashCommandManager_1 = __importDefault(require("./SlashCommandManager"));
const SecondActionHandler_1 = __importDefault(require("./handler/interaction/SecondActionHandler"));
const botInfo = requireJson_1.requireJson(__dirname + "/../../resources/discord.json");
exports.cache = {
    client: undefined,
    commonCommandManager: CommonCommandManager_1.default.instance,
    commandPrefix: botInfo["commandPrefix"],
    commands: new Array(),
    slashCommandManager: SlashCommandManager_1.default.instance,
    slashCommands: new Map(),
    secondActionHandler: SecondActionHandler_1.default.instance
};
