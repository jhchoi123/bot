import {Interaction} from "discord.js";
import SecondAction, {SecondActionInteraction} from "./SecondAction";

class SecondActionHandler {
    private actions: Map<string, SecondAction>;

    private constructor() {
        this.actions = new Map<string, SecondAction>();
    }

    private static _instance = new SecondActionHandler();

    public static get instance() {
        return this._instance;
    }

    public async addAction(secondAction: SecondAction) {
        this.actions.set(secondAction.customId, secondAction);
    }

    public async deleteAction(customId: string) {
        this.actions.delete(customId);
    }

    public async clearAction() {
        this.actions = new Map<string, SecondAction>();
    }

    public async handleSecondAction(interaction: Interaction) {
        const i = interaction as SecondActionInteraction;

        const action = (this.actions.get(i.customId));

        if (action != undefined) {
            try {
                await action.whenHandled(i);
            } catch (e) {
                console.log(e);
            }
        }
    }
}


export default SecondActionHandler;