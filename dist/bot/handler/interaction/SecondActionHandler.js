"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SecondActionHandler {
    constructor() {
        this.actions = new Map();
    }
    static get instance() {
        return this._instance;
    }
    async addAction(secondAction) {
        this.actions.set(secondAction.customId, secondAction);
    }
    async deleteAction(customId) {
        this.actions.delete(customId);
    }
    async clearAction() {
        this.actions = new Map();
    }
    async handleSecondAction(interaction) {
        const i = interaction;
        const action = (this.actions.get(i.customId));
        if (action != undefined) {
            try {
                await action.whenHandled(i);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
}
SecondActionHandler._instance = new SecondActionHandler();
exports.default = SecondActionHandler;
