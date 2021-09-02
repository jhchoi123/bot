import GetBungieNetUserById from "./GetBungieNetUserById";
import SearchUsers from "./SearchUsers";
import GetCredentialTypesForTargetAccount from "./GetCredentialTypesForTargetAccount";
import GetAvailableThemes from "./GetAvailableThemes";
import GetMembershipDataById from "./GetMembershipDataById";
import GetMembershipDataForCurrentUser from "./GetMembershipDataForCurrentUser";
import GetMembershipFromHardLinkedCredential from "./GetMembershipFromHardLinkedCredential";

class User {
    private readonly _X_API_KEY: string;
    private readonly _OAUTH_CLIENT_ID: number | undefined;
    private readonly _OAUTH_CLIENT_SECRET: string | undefined;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        this._X_API_KEY = X_API_KEY;
        this._OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this._OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
    }

    public get GetBungieNetUserById(): GetBungieNetUserById {
        return new GetBungieNetUserById(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get SearchUsers(): SearchUsers {
        return new SearchUsers(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get GetCredentialTypesForTargetAccount(): GetCredentialTypesForTargetAccount {
        return new GetCredentialTypesForTargetAccount(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get GetAvailableThemes(): GetAvailableThemes {
        return new GetAvailableThemes(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get GetMembershipDataById(): GetMembershipDataById {
        return new GetMembershipDataById(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get GetMembershipDataForCurrentUser(): GetMembershipDataForCurrentUser {
        return new GetMembershipDataForCurrentUser(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get GetMembershipFromHardLinkedCredential(): GetMembershipFromHardLinkedCredential {
        return new GetMembershipFromHardLinkedCredential(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
}

export default User;