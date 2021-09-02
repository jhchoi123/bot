"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionDBConnection_1 = __importStar(require("../TransactionDBConnection"));
class DestinyMembershipsDAO {
    constructor() {
        this.connection = new TransactionDBConnection_1.default();
    }
    async connect() {
        await this.connection.connect();
    }
    async close() {
        await this.connection.close();
    }
    async queryAll() {
        const result = await this.connection.execute("SELECT * FROM DESTINY_MEMBERSHIPS");
        let memberships = [];
        for (const row of result.rows) {
            const membership = {
                bungieMembershipId: row[0],
                destinyMembershipId: row[1],
                destinyMembershipType: row[2],
                destinyDisplayName: row[3],
                isDefault: this.toBool(row[4])
            };
            memberships.push(membership);
        }
        return memberships;
    }
    async queryByBungieMembershipId(membershipId) {
        const result = await this.connection
            .execute("SELECT * FROM DESTINY_MEMBERSHIPS WHERE DESTINY_MEMBERSHIPS = :1", [
            { type: TransactionDBConnection_1.STRING, val: membershipId }
        ]);
        let memberships = [];
        for (const row of result.rows) {
            const membership = {
                bungieMembershipId: row[0],
                destinyMembershipId: row[1],
                destinyMembershipType: row[2],
                destinyDisplayName: row[3],
                isDefault: this.toBool(row[4])
            };
            memberships.push(membership);
        }
        return memberships;
    }
    toBool(n) {
        return n == 1;
    }
}
