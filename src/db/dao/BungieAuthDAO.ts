import TransactionDBConnection, {NUMBER, STRING} from "../TransactionDBConnection";

class BungieAuthDAO {
    private connection: TransactionDBConnection = new TransactionDBConnection();

    public constructor() {
    }

    public async connect(): Promise<void> {
        await this.connection.connect();
    }

    public async close(): Promise<void> {
        await this.connection.close();
    }

    public async queryAll(): Promise<Array<Array<any>>> {
        const result = await this.connection.execute("SELECT * FROM BUNGIE_AUTH");
        return result.rows as Array<Array<any>>;
    }

    public async queryByDiscordId(discordId: string): Promise<Array<any>> {
        const result = await this.connection.execute("SELECT * FROM BUNGIE_AUTH WHERE DISCORD_ID = :1", [
            {
                type: STRING,
                val: discordId
            }
        ]);
        return (result.rows as Array<Array<any>>)[0];
    }

    public async queryByMembershipId(membershipId: string): Promise<Array<any>> {
        const result = await this.connection.execute("SELECT * FROM BUNGIE_AUTH WHERE MEMBERSHIP_ID = :1", [
            {
                type: STRING,
                val: membershipId
            }
        ]);
        return (result.rows as Array<Array<any>>)[0];
    }

    public async insertNewUser(user: BungieAuthUser): Promise<void> {
        await this.connection.execute(
            "INSERT INTO BUNGIE_AUTH VALUES (" +
            ":1, :2, :3, :4, :5, :6, :7, SYSDATE)", [
                {type: STRING, val: user.discordId},
                {type: STRING, val: user.accessToken},
                {type: STRING, val: user.tokenType},
                {type: NUMBER, val: user.expiresIn},
                {type: STRING, val: user.refreshToken},
                {type: NUMBER, val: user.refreshExpiresIn},
                {type: STRING, val: user.membershipId}
            ],
            {
                autoCommit: true
            });
    }

    public async updateUserByDiscordId(user: BungieAuthUser): Promise<void> {
        await this.connection.execute(
            "UPDATE BUNGIE_AUTH" +
            " SET ACCESS_TOKEN = :1," +
            "TOKEN_TYPE = :2," +
            "EXPIRES_IN = :3," +
            "REFRESH_TOKEN = :4," +
            "REFRESH_EXPIRES_IN: :5," +
            "ADDED_DATE = SYSDATE" +
            " WHERE DISCORD_ID = :6",
            [
                {type: STRING, val: user.accessToken},
                {type: STRING, val: user.tokenType},
                {type: NUMBER, val: user.expiresIn},
                {type: STRING, val: user.refreshToken},
                {type: NUMBER, val: user.refreshExpiresIn},
                {type: STRING, val: user.discordId}
            ],
            {
                autoCommit: true
            });
    }

    public async updateUserByMembershipId(user: BungieAuthUser): Promise<void> {
        await this.connection.execute(
            "UPDATE BUNGIE_AUTH" +
            " SET ACCESS_TOKEN = :1," +
            "TOKEN_TYPE = :2," +
            "EXPIRES_IN = :3," +
            "REFRESH_TOKEN = :4," +
            "REFRESH_EXPIRES_IN: :5," +
            "ADDED_DATE = SYSDATE" +
            " WHERE MEMBERSHIP_ID = :6",
            [
                {type: STRING, val: user.accessToken},
                {type: STRING, val: user.tokenType},
                {type: NUMBER, val: user.expiresIn},
                {type: STRING, val: user.refreshToken},
                {type: NUMBER, val: user.refreshExpiresIn},
                {type: STRING, val: user.discordId}
            ], {
                autoCommit: true
            });
    }

}

export interface BungieAuthUser {
    discordId?: string,
    accessToken: string,
    tokenType: string,
    expiresIn: number,
    refreshToken: string,
    refreshExpiresIn: number,
    membershipId?: string,
    addedDate?: Date
}

export default BungieAuthDAO;