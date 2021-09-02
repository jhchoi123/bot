"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("./cache");
const fs_1 = require("fs");
class BotPresenceManager {
    constructor() {
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
    static loadInstance() {
        this._instance = new BotPresenceManager();
    }
    async loadPresence() {
        const rawJson = await fs_1.promises.readFile(__dirname + "/../../resources/bot-presences.json");
        return JSON.parse(rawJson.toString()).filter(value => value != "");
    }
    changePresence(presence) {
        if (!cache_1.cache.client)
            return;
        if (!cache_1.cache.client.user)
            return;
        cache_1.cache.client.user.setActivity(presence, { type: "PLAYING" });
    }
}
exports.default = BotPresenceManager;
