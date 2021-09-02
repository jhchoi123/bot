import TransactionDBConnection, {STRING} from "../TransactionDBConnection";

class BungieAuthStateQueueDAO {
    private connection: TransactionDBConnection = new TransactionDBConnection();

    public constructor() {
    }

    public async connect(): Promise<void> {
        await this.connection.connect();
    }

    public async close(): Promise<void> {
        await this.connection.close();
    }

    public async commit(): Promise<void> {
        await this.connection.commit();
    }

    public async queryAll(): Promise<Array<Array<any>>> {
        const result = await this.connection.execute("SELECT * FROM BUNGIE_AUTH_STATE_QUEUE");
        return result.rows as Array<Array<any>>;
    }

    public async queryByDiscordId(discordId: string): Promise<Array<any>> {
        const result = await this.connection
            .execute("SELECT * FROM BUNGIE_AUTH_STATE_QUEUE WHERE DISCORD_ID = :1", [
                {type: STRING, val: discordId}
            ]);

        return (result.rows as Array<Array<any>>)[0];
    }

    public async queryByState(state: string): Promise<Array<any>> {
        const result = await this.connection
            .execute("SELECT * FROM BUNGIE_AUTH_STATE_QUEUE WHERE STATE = :1", [
                {type: STRING, val: state}
            ]);

        console.log(result);

        return (result.rows as Array<Array<any>>)[0];
    }

    public async insertNewQueue(stateQueue: StateQueue): Promise<void> {
        await this.connection
            .execute("INSERT INTO BUNGIE_AUTH_STATE_QUEUE VALUES (:1, :2, SYSDATE)", [
                {type: STRING, val: stateQueue.discordId},
                {type: STRING, val: stateQueue.state}
            ]);
    }

    public async deleteQueueByDiscordId(discordId: string): Promise<void> {
        await this.connection
            .execute("DELETE FROM BUNGIE_AUTH_STATE_QUEUE WHERE DISCORD_ID = :1", [
                {type: STRING, val: discordId}
            ]);
    }

    public async deleteQueueByState(state: string): Promise<void> {
        await this.connection
            .execute("DELETE FROM BUNGIE_AUTH_STATE_QUEUE WHERE STATE = :1", [
                {type: STRING, val: state}
            ]);
    }
}

export interface StateQueue {
    discordId: string | undefined,
    state: string | undefined,
    queuedDate?: Date
}

export default BungieAuthStateQueueDAO;