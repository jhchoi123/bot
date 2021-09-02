import {Client, Intents} from "discord.js";
import {handleMessage} from "./bot/handler/handleMessage";
import {handleInteraction} from "./bot/handler/handleInteraction";
import {handleReady} from "./bot/handler/handleReady";
import {requireJson} from "./util/requireJson";
import {cache} from "./bot/cache";

const botInfo = requireJson(__dirname + "/../resources/discord.json");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES
    ]
});

cache.client = client;

client.on("ready", () => handleReady(client));
client.on("messageCreate", message => handleMessage(client, message));
client.on("interactionCreate", interaction => handleInteraction(client, interaction));
client.on("applicationCommandCreate", cmd => {
    console.log(cmd);
});

client.login(botInfo["botToken"]).catch(e => {
    console.log(e);
});




