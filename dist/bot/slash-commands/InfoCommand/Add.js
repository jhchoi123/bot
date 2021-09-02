"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function doAdd(interaction) {
    const infoName = interaction.options.get("name")?.value;
    if (infoName == undefined)
        return;
    const messageId = interaction.options.get("id")?.value;
    if (messageId == undefined)
        return;
    try {
        const message = await interaction.channel?.messages.fetch(messageId);
        if (!message)
            throw new Error();
        const content = message.content;
        const embeds = message.embeds;
        const attachments = message.attachments;
    }
    catch {
        await interaction
            .reply("Please Insert Correct Message ID | 올바른 메세지 ID를 입력해 주세요");
        return;
    }
}
exports.default = doAdd;
