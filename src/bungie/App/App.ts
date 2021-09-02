import GetBungieApplications from "./GetBungieApplications";
import GetApplicationApiUsage from "./GetApplicationApiUsage";

class App {
    private readonly _X_API_KEY: string;
    private readonly _OAUTH_CLIENT_ID: number | undefined;
    private readonly _OAUTH_CLIENT_SECRET: string | undefined;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        this._X_API_KEY = X_API_KEY;
        this._OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this._OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
    }

    public get GetBungieApplications(): GetBungieApplications {
        return new GetBungieApplications(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get GetApplicationApiUsage(): GetApplicationApiUsage {
        return new GetApplicationApiUsage(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
}

export default App;