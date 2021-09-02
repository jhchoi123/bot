"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = void 0;
const cache_1 = require("../cache");
function handleMessage(client, message) {
    if (message.author.bot)
        return;
    if (!message.content.startsWith(cache_1.cache.commandPrefix))
        return;
    const rawMessage = message.content;
    const args = rawMessage.split(" ");
    const commandName = args[0].replace(cache_1.cache.commandPrefix, "");
    cache_1.cache.commonCommandManager.handleCommand(commandName, message);
}
exports.handleMessage = handleMessage;
