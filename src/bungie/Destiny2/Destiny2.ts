import GetDestinyManifest from "./GetDestinyManifest";
import SearchDestinyPlayer from "./SearchDestinyPlayer";
import GetProfile from "./GetProfile";
import SearchDestinyEntities from "./SearchDestinyEntities";
import GetCharacter from "./GetCharacter";
import GetItem from "./GetItem";
import GetCollectibleNodeDetails from "./GetCollectibleNodeDetails";

class Destiny2 {
    private readonly _X_API_KEY: string;
    private readonly _OAUTH_CLIENT_ID: number | undefined;
    private readonly _OAUTH_CLIENT_SECRET: string | undefined;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        this._X_API_KEY = X_API_KEY;
        this._OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this._OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
    }

    public get GetDestinyManifest(): GetDestinyManifest {
        return new GetDestinyManifest(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get SearchDestinyPlayer(): SearchDestinyPlayer {
        return new SearchDestinyPlayer(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get GetProfile(): GetProfile {
        return new GetProfile(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    get SearchDestinyEntities(): SearchDestinyEntities {
        return new SearchDestinyEntities(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    get GetCharacter(): GetCharacter {
        return new GetCharacter(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    get GetItem(): GetItem {
        return new GetItem(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    get GetCollectibleNodeDetails(): GetCollectibleNodeDetails {
        return new GetCollectibleNodeDetails(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
}

export default Destiny2;