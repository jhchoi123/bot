"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const handleMessage_1 = require("./bot/handler/handleMessage");
const handleInteraction_1 = require("./bot/handler/handleInteraction");
const handleReady_1 = require("./bot/handler/handleReady");
const requireJson_1 = require("./util/requireJson");
const cache_1 = require("./bot/cache");
const botInfo = requireJson_1.requireJson(__dirname + "/../resources/discord.json");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES
    ]
});
cache_1.cache.client = client;
client.on("ready", () => handleReady_1.handleReady(client));
client.on("messageCreate", message => handleMessage_1.handleMessage(client, message));
client.on("interactionCreate", interaction => handleInteraction_1.handleInteraction(client, interaction));
client.on("applicationCommandCreate", cmd => {
    console.log(cmd);
});
client.login(botInfo["botToken"]).catch(e => {
    console.log(e);
});
