import OracleDB, {BindParameters, Connection, ExecuteManyOptions, ExecuteOptions, Result} from "oracledb";
import OracleConnector from "./OracleConnector";

class TransactionDBConnection {
    private connection?: Connection;

    constructor() {
    }

    public async connect(): Promise<void> {
        console.log("Creating Transaction DB Connection...")
        this.connection = await (OracleConnector.instance.getTransactionConnection());
        console.log("Transaction DB Connected!")
    }

    public async close(): Promise<void> {
        if (this.connection == undefined) {
            throw new Error("Transaction DB Connection didn't Connected");
        }

        return this.connection?.close();
    }

    public async commit(): Promise<void> {
        await this.connection?.commit();
    }

    public async execute(sql: string, bindParameters?: BindParameters, options?: ExecuteOptions): Promise<Result<unknown>> {
        if (this.connection == undefined) {
            throw new Error("Transaction DB Connection didn't Connected");
        }

        let result: Promise<Result<unknown>> | undefined;

        if (bindParameters != undefined && options != undefined) {
            result = this.connection?.execute(sql, bindParameters, options);
        } else if (bindParameters != undefined) {
            result = this.connection?.execute(sql, bindParameters);
        } else {
            result = this.connection?.execute(sql);
        }

        if (result == undefined) {
            return new class implements OracleDB.Result<unknown> {
            }
        } else {
            return result;
        }
    }

    public async executeMany(sql: string, binds: BindParameters[], options?: ExecuteManyOptions): Promise<Result<unknown>> {
        if (this.connection == undefined) {
            throw new Error("Transaction DB Connection didn't Connected");
        }

        let result;

        if (options != undefined) {
            result = this.connection?.executeMany(sql, binds, options);
        } else {
            result = this.connection?.executeMany(sql, binds);
        }

        if (result == undefined) {
            return new class implements OracleDB.Result<unknown> {
            }
        } else {
            return result;
        }
    }
}

export {STRING, NUMBER} from 'oracledb';

export default TransactionDBConnection;