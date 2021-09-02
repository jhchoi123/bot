import TransactionDBConnection, {STRING} from "../TransactionDBConnection";

class DestinyMembershipsDAO {
    private connection: TransactionDBConnection = new TransactionDBConnection();

    public constructor() {
    }

    public async connect(): Promise<void> {
        await this.connection.connect();
    }

    public async close(): Promise<void> {
        await this.connection.close();
    }

    public async queryAll(): Promise<DestinyMemberships> {
        const result = await this.connection.execute("SELECT * FROM DESTINY_MEMBERSHIPS");

        let memberships: DestinyMemberships = [];

        for (const row of (result.rows as Array<any>)) {
            const membership: DestinyMembership = {
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

    public async queryByBungieMembershipId(membershipId: string) {
        const result = await this.connection
            .execute("SELECT * FROM DESTINY_MEMBERSHIPS WHERE DESTINY_MEMBERSHIPS = :1", [
                {type: STRING, val: membershipId}
            ]);

        let memberships: DestinyMemberships = [];

        for (const row of (result.rows as Array<any>)) {
            const membership: DestinyMembership = {
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

    private toBool(n: number) {
        return n == 1;
    }
}

type DestinyMemberships = Array<DestinyMembership>

interface DestinyMembership {
    bungieMembershipId: string,
    destinyMembershipId: string,
    destinyMembershipType: number,
    destinyDisplayName: string,
    isDefault: boolean
}