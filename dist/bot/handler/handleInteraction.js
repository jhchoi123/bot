"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInteraction = void 0;
const cache_1 = require("../cache");
function handleInteraction(client, interaction) {
    if (interaction.isButton() || interaction.isSelectMenu()) {
        cache_1.cache.secondActionHandler.handleSecondAction(interaction);
    }
    if (interaction.isCommand()) {
        cache_1.cache.slashCommandManager.handleCommand(interaction.commandName, interaction);
    }
}
exports.handleInteraction = handleInteraction;
