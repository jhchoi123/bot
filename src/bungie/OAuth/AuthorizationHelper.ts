class AuthorizationHelper {
    public static readonly METHOD = "GET";
    public static readonly FULL_URL = "https://www.bungie.net/en/oauth/authorize";
    private readonly clientId: number;

    public constructor(oAuthClientId: number) {
        this.clientId = oAuthClientId;
    }

    public generateState(): string {
        return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    }

    public createAuthorizationUrl(state: string, redirectUri?: string): string {
        const qs = new URLSearchParams({
            client_id: String(this.clientId),
            response_type: "code",
            state: state
        });

        if (redirectUri != undefined) {
            qs.append("redirect_uri", redirectUri);
        }

        return AuthorizationHelper.FULL_URL + "?" + qs.toString();
    }
}

export default AuthorizationHelper;