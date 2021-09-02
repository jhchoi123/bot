import GetGroupsForMember from "./GetGroupsForMember";
import GetGroup from "./GetGroup";
import GetMembersOfGroup from "./GetMembersOfGroup";

class GroupV2 {
    private readonly _X_API_KEY: string;
    private readonly _OAUTH_CLIENT_ID: number | undefined;
    private readonly _OAUTH_CLIENT_SECRET: string | undefined;

    public constructor(X_API_KEY: string, OAUTH_CLIENT_ID?: number, OAUTH_CLIENT_SECRET?: string) {
        this._X_API_KEY = X_API_KEY;
        this._OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
        this._OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
    }

    public get GetGroupsForMember(): GetGroupsForMember {
        return new GetGroupsForMember(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get GetGroup(): GetGroup {
        return new GetGroup(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }

    public get GetMembersOfGroup(): GetMembersOfGroup {
        return new GetMembersOfGroup(this._X_API_KEY, this._OAUTH_CLIENT_ID, this._OAUTH_CLIENT_SECRET);
    }
}

export default GroupV2;