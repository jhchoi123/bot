// Bungie API Documentation: https://bungie-net.github.io/multi/index.html
// Bungie API Git Hub: https://github.com/Bungie-net/api

import Destiny2 from "./Destiny2/Destiny2";
import App from "./App/App";
import User from "./User/User";
import OAuth from "./OAuth/OAuth";
import GroupV2 from "./GroupV2/GroupV2";

class BungieAPIWrapper {
    public constructor(X_API_KEY: string, isSecret?: boolean, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        this._X_API_KEY = X_API_KEY;
        this._OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this._OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
        this._isSecret = isSecret;
    }

    private _X_API_KEY: string;

    get X_API_KEY(): string {
        return this._X_API_KEY;
    }

    set X_API_KEY(value: string) {
        this._X_API_KEY = value;
    }

    private _OAUTH_CLIENT_ID: number | undefined;

    /** If OAuth Client Id is undefined, Returns 0 */
    get OAUTH_CLIENT_ID(): number {
        if (this._OAUTH_CLIENT_ID == undefined) {
            return 0;
        } else {
            return this._OAUTH_CLIENT_ID;
        }
    }

    set OAUTH_CLIENT_ID(value: number) {
        this._OAUTH_CLIENT_ID = value;
    }

    private _OAUTH_CLIENT_SECRET: string | undefined;

    /** If OAuth Client Secret is undefined, Returns "" */
    get OAUTH_CLIENT_SECRET(): string {
        if (this._OAUTH_CLIENT_SECRET == undefined) {
            return "";
        } else {
            return this._OAUTH_CLIENT_SECRET;
        }
    }

    /** If You Set OAuth Client Secret, isSecret Will Be true */
    set OAUTH_CLIENT_SECRET(value: string) {
        this._isSecret = true;
        this._OAUTH_CLIENT_SECRET = value;
    }

    private _isSecret: boolean | undefined;

    /** If isSecret is undefined, Returns false */
    get isSecret(): boolean {
        if (this._isSecret == undefined) {
            return false;
        } else {
            return this._isSecret;
        }
    }

    /** If You Set False, OAuth Client Secret Will Be undefined */
    set isSecret(value: boolean) {
        this._isSecret = value;
        if (!value) {
            this._OAUTH_CLIENT_SECRET = undefined;
        }
    }

    public get Destiny2(): Destiny2 {
        return new Destiny2(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get App(): App {
        return new App(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get User(): User {
        return new User(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get OAuth(): OAuth {
        if (this._isSecret == undefined || this._OAUTH_CLIENT_ID == undefined) {
            throw new Error("OAuth Requires isSecret and OAuth Client ID!");
        } else {
            return new OAuth(this._X_API_KEY, this._isSecret, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
        }
    }

    public get GroupV2(): GroupV2 {
        return new GroupV2(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
}

export default BungieAPIWrapper;