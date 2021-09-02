"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReady = void 0;
const cache_1 = require("../cache");
const BotPresenceManager_1 = __importDefault(require("../BotPresenceManager"));
async function handleReady(client) {
    const botName = client.user?.tag;
    console.log(`Bot Logged In as ${botName}`);
    await cache_1.cache.commonCommandManager.loadCommands();
    await cache_1.cache.slashCommandManager.loadCommands();
    BotPresenceManager_1.default.loadInstance();
}
exports.handleReady = handleReady;
