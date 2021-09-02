import {AbstractSearchOption} from "./AbstractSearchOption";
import {Headers} from "node-fetch";

abstract class AbstractAPIEndpoint {
    public static readonly ROOT_PATH = "https://www.bungie.net/Platform";

    private readonly _X_API_KEY: string;
    private readonly _OAUTH_CLIENT_ID: number | undefined;
    private readonly _OAUTH_CLIENT_SECRET: string | undefined;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        this._X_API_KEY = X_API_KEY;
        this._OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this._OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
    }

    public get X_API_KEY(): string {
        return this._X_API_KEY;
    }

    public get OAUTH_CLIENT_ID(): number | undefined {
        return this._OAUTH_CLIENT_ID;
    }

    public get OAUTH_CLIENT_SECRET(): string | undefined {
        return this._OAUTH_CLIENT_SECRET;
    }

    public createHeaders(oAuthToken?: string): Headers {
        const headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("X-API-Key", this._X_API_KEY);

        if (oAuthToken != undefined) {
            headers.append("Authorization", `Bearer ${oAuthToken}`);
        }

        return headers;
    }

    public abstract execute(options?: AbstractSearchOption): object;
}

export default AbstractAPIEndpoint;
