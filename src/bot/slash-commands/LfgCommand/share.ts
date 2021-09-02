import {
    CommandInteraction,
    Message,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    MessageSelectMenu,
    SelectMenuInteraction
} from "discord.js";
import {requireJson} from "../../../util/requireJson";
import {isCorrectDateFormat, toDate} from "../../../util/date-formatting";
import {activities, Activity, LFG, NamedLFGUser, StringActivityLFG} from "../../../function/LFGManager";

const emoji = requireJson(__dirname + "/../../../../resources/emoji.json");

class LfgShare {
    // ---------- embeds ----------
    public static getTitleSetEmbed(): MessageEmbed {
        const embed = new MessageEmbed();

        embed.setTitle("Type LFG Title | LFG 제목을 입력해 주세요");
        embed.setFooter("Type c to Cancel | c를 입력해서 취소합니다");

        return embed;
    }

    public static getDescSetEmbed(): MessageEmbed {
        const embed = new MessageEmbed();

        embed.setTitle("Type LFG Description | LFG 설명을 입력해 주세요");
        embed.setFooter("Type c to Cancel | c를 입력해서 취소합니다");

        return embed;
    }

    public static getDateSetEmbed(): MessageEmbed {
        const embed = new MessageEmbed();

        embed.setTitle("Type LFG Date | LFG 일시를 입력해 주세요");
        embed.setDescription("Please Type the Below-Format Date | 아래 형식과 같이 입력해 주세요");
        embed.addFields([
            {
                name: "YYYY-MM-DD HH24:mm",
                value: "ex: 2021-08-08 20:30",
                inline: true
            },
            {
                name: "MM-DD HH24:mm",
                value: "ex: 08-08 13:00",
                inline: true
            },
            {
                name: "HH24:mm",
                value: "ex: 18:45",
                inline: true
            },
            {
                name: "NOW | 바로 출발",
                value: "NOW",
                inline: false
            }
        ]);
        embed.setFooter("Type c to Cancel | c를 입력해서 취소합니다");

        return embed;
    }

    public static getActivitySetEmbed(): MessageEmbed {
        const embed = new MessageEmbed();

        embed.setTitle("Select Activity | 활동을 선택해 주세요");

        embed.setFooter("Select c to Cancel | C를 선택해서 취소합니다");

        return embed;
    }

    public static getSubActivitySetEmbed(): MessageEmbed {
        const embed = new MessageEmbed();

        embed.setTitle("Select Sub Activity | 하위 활동을 선택해 주세요");

        embed.setFooter("Select c to Cancel | C를 선택해서 취소합니다");

        return embed;
    }


    // ---------- interaction components ----------

    // ---------- collect methods ----------
    public static async collectString(interaction: CommandInteraction, message: Message): Promise<string> {
        const collectedMessageCollection = await message.channel.awaitMessages({
            filter: collectedMessage => {
                return collectedMessage.author.id == interaction.user.id;
            },
            max: 1,
            time: 1000 * 60
        });

        // ----- cancel command if there is no Title
        if (!collectedMessageCollection || !collectedMessageCollection.first()) {
            return "\\Canceled\\";
        }
        const collectedMessage = collectedMessageCollection.first();
        if (!collectedMessage) return "\\Canceled\\";
        // -----

        await collectedMessage.delete();

        const collectedString = collectedMessage.content;

        // cancel command if title is blank
        if (collectedString == "") return "\\Canceled\\";
        if (collectedString.toLowerCase() == "c") return "\\Canceled\\";

        return collectedString;
    }

    public static async collectActivity(interaction: CommandInteraction): Promise<Activity> {
        if (!interaction.channel) throw new Error();

        const rootActivityMessage = await interaction.channel.send({
            embeds: [this.getActivitySetEmbed()],
            components: this.getRootActivitySelection(interaction.id)
        });

        const collectedRootActivity = (await rootActivityMessage.awaitMessageComponent({
            filter: i => i.customId.startsWith(`${interaction.id}_root_activity_selection`)
                && i.user.id == interaction.user.id,
            time: 1000 * 60
        }));
        await rootActivityMessage.delete();

        if (collectedRootActivity.customId == `${interaction.id}_root_activity_selection_c`) {
            throw new Error();
        }

        const rootActivityIndex = Number((collectedRootActivity as SelectMenuInteraction).values[0]);
        let activity = activities[rootActivityIndex];

        if (activity.isGroup) {
            const subActivityMessage = await interaction.channel.send({
                embeds: [this.getSubActivitySetEmbed()],
                components: this.getTargetActivitySelection(interaction.id, rootActivityIndex)
            });

            const collectedSubActivity = await interaction.channel.awaitMessageComponent({
                filter: i => i.customId.startsWith(`${interaction.id}_activity_`) &&
                    i.user.id == interaction.user.id,
                time: 1000 * 60
            });

            await subActivityMessage.delete();

            if (collectedSubActivity.customId == `${interaction.id}_activity_c`) {
                throw new Error();
            }

            const subActivityIndex = Number((collectedSubActivity as SelectMenuInteraction).values[0]);

            if (!activity.activities) throw new Error();
            activity = activity.activities[subActivityIndex];
        }

        return activity;
    }

    public static async collectDate(interaction: CommandInteraction, message: Message): Promise<Date> {
        const correctPlzMessagePromises: Array<Promise<Message>> = [];

        const dateStringMessageCollection = await message.channel.awaitMessages({
            filter: (m) => {
                if (m.author.id == interaction.user.id) {
                    if (isCorrectDateFormat(m.content)) {
                        return true;
                    } else {
                        const correctPlzMsg = m.channel.send("Please Type Correct Format | 올바른 포멧으로 입력해 주세요");
                        correctPlzMessagePromises.push(correctPlzMsg);
                        return false;
                    }
                }
                return false;
            },
            time: 1000 * 60 * 2,
            max: 1
        });

        // ----- cancel command if there is no date string
        if (!dateStringMessageCollection || !dateStringMessageCollection.first()) {

            throw new Error();
        }
        const collectedMessage = dateStringMessageCollection.first();
        if (!collectedMessage) throw new Error();
        // -----
        await collectedMessage.delete();

        // delete correct please messages
        const correctPlzMessages = await Promise.all(correctPlzMessagePromises);
        for (const m of correctPlzMessages) {
            await m.delete();
        }

        return toDate(collectedMessage.content);
    }

    public static createLfgEmbed(lfg: StringActivityLFG, users: Array<NamedLFGUser>): MessageEmbed {
        const embed = new MessageEmbed();
        embed.setTitle(`LFG: ${lfg.title} (${lfg.activity})`);
        embed.setDescription(`ID: ${lfg.id}\t\n`
            + lfg.description);

        let join = "";
        let alter = "";

        for (const user of users) {
            if (user.userType.toLowerCase() == "join" || user.userType.toLowerCase() == "creator") {
                join = join + `${user.userName}, `;
            } else if (user.userType.toLowerCase() == "alter") {
                alter = alter + `${user.userName}, `;
            }
        }

        if (join != "") join = join.substring(0, join.length - 2);
        if (alter != "") alter = alter.substring(0, alter.length - 2);

        if (join == "") join = "None";
        if (alter == "") alter = "None";

        embed.addFields([
            {
                name: "JOIN | 참여",
                value: join,
                inline: false
            },
            {
                name: "ALTER | 참여 불분명",
                value: alter,
                inline: false
            }
        ]);

        embed.setFooter(`${lfg.date.getFullYear()}-${lfg.date.getMonth() + 1}-${lfg.date.getDate()} `
            + `${lfg.date.getHours()}:${lfg.date.getMinutes()}`);

        return embed;
    }

    // lfg_i_${lfgId}_[join | alter | leave]_${messageId}
    public static createLfgInteractionButtons(lfgId: number, messageId: string) {
        const row = new MessageActionRow();

        const joinButton = new MessageButton().setLabel("JOIN").setStyle("PRIMARY")
            .setCustomId(`lfg_i_${lfgId}_join_${messageId}`);
        const alterButton = new MessageButton().setLabel("ALTER").setStyle("SECONDARY")
            .setCustomId(`lfg_i_${lfgId}_alter_${messageId}`);
        const leaveButton = new MessageButton().setLabel("LEAVE").setStyle("DANGER")
            .setCustomId(`lfg_i_${lfgId}_leave_${messageId}`);

        row.addComponents([
            joinButton, alterButton, leaveButton
        ]);

        return row;
    }

    // ${interactionId}_root_activity_selection
    private static getRootActivitySelection(interactionId: string): MessageActionRow[] {
        const row = new MessageActionRow();

        const selection = new MessageSelectMenu();
        selection.setCustomId(`${interactionId}_root_activity_selection`);
        selection.setPlaceholder("Select Activity From Here | 여기에서 활동을 선택해 주세요");

        const options = [];
        for (let i = 0; i < activities.length; i++) {
            const activity = activities[i];
            const option = {
                label: `${activity.kr}`,
                value: `${i}`,
                description: `${activity.name}`
            }

            options.push(option);
        }

        selection.addOptions(options);

        row.addComponents(selection);

        const cancelRow = new MessageActionRow();

        const cancelButton = this.getCancelButton();
        cancelButton.setCustomId(`${interactionId}_root_activity_selection_c`);

        cancelRow.addComponents(cancelButton);

        return [row, cancelRow];
    }

    // ${interactionId}_activity_${activityIndex}
    private static getTargetActivitySelection(interactionId: string, activityIndex: number): MessageActionRow[] {
        const targetActivity = activities[activityIndex];
        if (!targetActivity) {
            throw new Error();
        }

        const targetActivities = targetActivity.activities;
        if (!targetActivities) {
            throw new Error();
        }

        const row = new MessageActionRow();

        const selection = new MessageSelectMenu();
        selection.setCustomId(`${interactionId}_activity_${activityIndex}`);
        selection.setPlaceholder("Select Activity From Here | 여기에서 활동을 선택해 주세요");

        const options = [];
        for (let i = 0; i < targetActivities.length; i++) {
            const activity = targetActivities[i];

            const option = {
                label: `${activity.kr}`,
                description: `${activity.name}`,
                value: `${i}`
            }

            options.push(option);
        }
        selection.addOptions(options);

        row.addComponents(selection);

        const cancelRow = new MessageActionRow();
        const cancelButton = this.getCancelButton();
        cancelButton.setCustomId(`${interactionId}_activity_c`);
        cancelRow.addComponents(cancelButton);

        return [row, cancelRow];
    }

    private static getCancelButton(): MessageButton {
        const button = new MessageButton();
        button.setStyle("DANGER");
        button.setLabel("C");
        button.setDisabled(false);

        return button;
    }
}

export {
    activities,
    Activity,
    LFG
};
export default LfgShare;