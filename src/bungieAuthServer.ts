import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import BungieOAuthManager from "./function/BungieOAuthManager";
import {requireJson} from "./util/requireJson";
import path from "path";

const serverInfo = requireJson(__dirname + "/../resources/server/server.json");

const app = express();
const parser = bodyParser.urlencoded({
    extended: false
});

const port = serverInfo["authServer"]["port"];

app.get("/favicon.ico", (req, res) => {
    try {
        res.sendFile(path.resolve(__dirname + `/../www/auth/favicon.ico`));
    } catch (e) {
        res.sendStatus(404);
    }
})

app.get("/css/:filename", (req, res) => {
    const fileName = req.params.filename;
    try {
        res.sendFile(path.resolve(__dirname + `/../www/auth/css/${fileName}`));
    } catch (e) {
        res.sendStatus(404);
    }
});

app.get("/js/:filename", (req, res) => {
    const fileName = req.params.filename;
    try {
        res.sendFile(path.resolve(__dirname + `/../www/auth/js/${fileName}`));
    } catch (e) {
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
        } else {
            code = rawCode as string;
            state = rawState as string;
        }

        await doProcess(req, res, code, state);
    } catch (e) {
        console.log("Some Error Occurred on Auth");
        console.log(e);

        doError(req, res);
    }
});

function doError(req: Request, res: Response) {
    res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate"
    });

    res.sendFile(path.resolve(__dirname + "/../www/auth/error.html"));
}

async function doProcess(req: Request, res: Response, code: string, state: string) {
    const authManager = BungieOAuthManager.instance;

    try {
        const discordId = await authManager.getDiscordIdFromStateQueue(state);
        await authManager.deleteStateQueueByState(state);

        const token = await authManager.requestAccessToken(code);
        const isSuccessfullySaved = await authManager.saveAccessToken(discordId, token);

        if (isSuccessfullySaved) {
            res.set({
                "Cache-Control": "no-cache, no-store, must-revalidate"
            });
            res.sendFile(path.resolve(__dirname + "/../www/auth/success.html"));
        } else {
            throw new Error("Some Error Occurred on Token Process");
        }
    } catch (e) {
        throw new Error(e);
    }
}

app.listen(port, () => {
    console.log(`Bungie Auth Running on Port ${serverInfo.authServer.port}`);
});



