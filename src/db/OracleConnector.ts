import {Connection, createPool, initOracleClient, Pool} from 'oracledb';
import {requireJson} from "../util/requireJson";

const connectionInfo = requireJson(__dirname + "/../../resources/db/connection.json");

class OracleConnector {
    private static readonly _instance = new OracleConnector();

    private transactionPool: Pool | undefined;
    private jsonPool: Pool | undefined;

    private constructor() {
        initOracleClient({
            // libDir: D:\Development\OracleInstantClient_19_11
            libDir: "/home/ubuntu/instantclient_21_1"
        });

        (async () => {
            this.transactionPool = await createPool({
                user: connectionInfo.transactionDB.userName,
                password: connectionInfo.transactionDB.password,
                connectString: connectionInfo.transactionDB.connectionString
            });
            console.log("Transaction Pool Opened");

            this.jsonPool = await createPool({
                user: connectionInfo.jsonDB.userName,
                password: connectionInfo.jsonDB.password,
                connectString: connectionInfo.transactionDB.connectionString
            });
            console.log("Json Pool Opened");
        })();
    }

    public static get instance(): OracleConnector {
        return this._instance;
    }

    public async getTransactionConnection(): Promise<Connection> {
        if (this.transactionPool == undefined) {
            throw new Error();
        }
        return await this.transactionPool.getConnection();
    }

    public async getJsonConnection(): Promise<Connection> {
        if (this.jsonPool == undefined) {
            throw new Error();
        }
        return await this.jsonPool.getConnection();
    }
}

export default OracleConnector;