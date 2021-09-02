import {Client, CommandInteraction, Interaction} from "discord.js";
import {cache} from "../cache";

export function handleInteraction(client: Client, interaction: Interaction) {
    if (interaction.isButton() || interaction.isSelectMenu()) {
        cache.secondActionHandler.handleSecondAction(interaction);
    }

    if (interaction.isCommand()) {
        cache.slashCommandManager.handleCommand(interaction.commandName, interaction as CommandInteraction);
    }
}