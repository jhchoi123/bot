// https://github.com/Bungie-net/api/wiki/OAuth-Documentation

import AuthorizationHelper from "./AuthorizationHelper";
import TokenHelper from "./TokenHelper";

class OAuth {
    private readonly X_API_KEY: string;
    private readonly OAUTH_CLIENT_ID: number;
    private readonly OAUTH_CLIENT_SECRET: string | undefined;
    private readonly isSecret: boolean;

    public constructor(X_API_KEY: string, isSecret: boolean, OAUTH_CLIENT_ID: number, OAUTH_CLIENT_SECRET?: string) {
        this.X_API_KEY = X_API_KEY;
        this.OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this.OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
        this.isSecret = isSecret;
    }

    public get AuthorizationHelper(): AuthorizationHelper {
        return new AuthorizationHelper(this.OAUTH_CLIENT_ID);
    }

    public get TokenHelper(): TokenHelper {
        return new TokenHelper(this.isSecret, this.OAUTH_CLIENT_ID, this.OAUTH_CLIENT_SECRET);
    }
}

export default OAuth;