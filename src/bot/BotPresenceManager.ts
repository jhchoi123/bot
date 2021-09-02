import {cache} from "./cache";
import {Client} from "discord.js";
import {promises as fs} from "fs";

class BotPresenceManager {
    private static _instance: BotPresenceManager;

    private readonly client: Client | undefined;

    private presences: Presences | undefined;

    private constructor() {
        console.log("Initialize Bot Presence Manager");

        (async () => {
            this.presences = await this.loadPresence();
            console.log("presences loaded");
        })();

        // set presence randomly
        setInterval(async () => {
            if (this.presences != undefined) {
                const index = Math.floor(Math.random() * (this.presences.length - 1));
                const targetPresence = this.presences[index];
                this.changePresence(targetPresence);
                console.log("presences changed: " + targetPresence);
            }
        }, 1000 * 60 * 3);

        // load presences every hours
        setInterval(async () => {
            this.presences = await this.loadPresence();
            console.log("presences reloaded");
        }, 1000 * 60 * 30);
    }

    public static loadInstance() {
        this._instance = new BotPresenceManager();
    }

    private async loadPresence(): Promise<Presences> {
        const rawJson = await fs.readFile(__dirname + "/../../resources/bot-presences.json");
        return (JSON.parse(rawJson.toString()) as Presences).filter(value => value != "");
    }

    private changePresence(presence: string) {
        if (!cache.client) return;
        if (!cache.client.user) return;

        cache.client.user.setActivity(presence, {type: "PLAYING"});
    }
}


type Presences = string[];

export default BotPresenceManager;