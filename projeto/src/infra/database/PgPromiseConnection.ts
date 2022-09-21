import Connection from "./Connection";
import pgp from "pg-promise"

export default class PgPromiseConnection implements Connection {
    pgp: any

    constructor () {
        this.pgp = pgp()("postgres://postgres:root@localhost:5432/app")
    }

    async query(statement: string, params: any[]): Promise<any[]> {
        return this.pgp.query(statement, params)
    }
    
    async close(): Promise<void> {
        this.pgp.$pool.end()
    }
}