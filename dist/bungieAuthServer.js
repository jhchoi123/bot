"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const BungieOAuthManager_1 = __importDefault(require("./function/BungieOAuthManager"));
const requireJson_1 = require("./util/requireJson");
const path_1 = __importDefault(require("path"));
const serverInfo = requireJson_1.requireJson(__dirname + "/../resources/server/server.json");
const app = express_1.default();
const parser = body_parser_1.default.urlencoded({
    extended: false
});
const port = serverInfo["authServer"]["port"];
app.get("/favicon.ico", (req, res) => {
    try {
        res.sendFile(path_1.default.resolve(__dirname + `/../www/auth/favicon.ico`));
    }
    catch (e) {
        res.sendStatus(404);
    }
});
app.get("/css/:filename", (req, res) => {
    const fileName = req.params.filename;
    try {
        res.sendFile(path_1.default.resolve(__dirname + `/../www/auth/css/${fileName}`));
    }
    catch (e) {
        res.sendStatus(404);
    }
});
app.get("/js/:filename", (req, res) => {
    const fileName = req.params.filename;
    try {
        res.sendFile(path_1.default.resolve(__dirname + `/../www/auth/js/${fileName}`));
    }
    catch (e) {
        res.sendStatus(404);
    }
});
app.get("/", parser, async (req, res) => {
    try {
        const rawCode = req.query.code;
        const rawState = req.query.state;
        let code = "";
        let state = "";
        if (rawCode == undefined || rawState == undefined) {
            throw new Error("Failed to Get Auth Information");
        }
        else {
            code = rawCode;
            state = rawState;
        }
        await doProcess(req, res, code, state);
    }
    catch (e) {
        console.log("Some Error Occurred on Auth");
        console.log(e);
        doError(req, res);
    }
});
function doError(req, res) {
    res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate"
    });
    res.sendFile(path_1.default.resolve(__dirname + "/../www/auth/error.html"));
}
async function doProcess(req, res, code, state) {
    const authManager = BungieOAuthManager_1.default.instance;
    try {
        const discordId = await authManager.getDiscordIdFromStateQueue(state);
        await authManager.deleteStateQueueByState(state);
        const token = await authManager.requestAccessToken(code);
        const isSuccessfullySaved = await authManager.saveAccessToken(discordId, token);
        if (isSuccessfullySaved) {
            res.set({
                "Cache-Control": "no-cache, no-store, must-revalidate"
            });
            res.sendFile(path_1.default.resolve(__dirname + "/../www/auth/success.html"));
        }
        else {
            throw new Error("Some Error Occurred on Token Process");
        }
    }
    catch (e) {
        throw new Error(e);
    }
}
app.listen(port, () => {
    console.log(`Bungie Auth Running on Port ${serverInfo.authServer.port}`);
});
