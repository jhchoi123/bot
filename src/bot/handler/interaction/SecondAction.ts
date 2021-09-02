import {ButtonInteraction, SelectMenuInteraction} from "discord.js";

export default interface SecondAction {
    customId: string,
    whenHandled: WhenHandled
}

export type SecondActionInteraction = SelectMenuInteraction | ButtonInteraction;
type WhenHandled = (interaction: SecondActionInteraction) => void;