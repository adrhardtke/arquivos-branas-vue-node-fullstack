import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";

describe.skip('Connection', () => {
    test('should connect to database', async () => {
        const connection = new PgPromiseConnection()
        await connection.query("delete from kanban.card",[])
        await connection.query("delete from kanban.column", [])
        await connection.query("delete from kanban.board", [])
        const boardData = await connection.query("insert into kanban.board (name) values ($1) returning *",["A"])
        expect(boardData).toHaveLength(1)
        await connection.query("delete from kanban.card",[])
        await connection.query("delete from kanban.column", [])
        await connection.query("delete from kanban.board", [])
        await connection.close()
    });
});