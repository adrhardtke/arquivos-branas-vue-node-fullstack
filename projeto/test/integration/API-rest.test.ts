import axios from 'axios'
import { Board } from '../../src/domain/entities/Board'
import { Column } from '../../src/domain/entities/Column'
import BoardRepository from '../../src/domain/repositories/BoardRepository'
import Connection from '../../src/infra/database/Connection'
import PgPromiseConnection from '../../src/infra/database/PgPromiseConnection'
import BoardRepositoryDatabase from '../../src/infra/repositories/database/BoardRepositoryDatabase'

let connection: Connection
let boardRepository: BoardRepository
let idBoard: number

describe("API", () => {
    beforeAll(async () => {
        connection = new PgPromiseConnection()
        boardRepository = new BoardRepositoryDatabase(connection)
        const board = new Board(null, "A")
        board.addColumn(new Column(null, 'todo', true))
        board.addColumn(new Column(null, 'doing', true))
        board.addColumn(new Column(null, 'done', false))
        idBoard = await boardRepository.save(board)
    })
    afterAll(async () => {
        await connection.close()
    })
    test.skip("deve chamar o service /boards", async () => {
        const response = await axios({
            url: "http://localhost:3000/boards"
        })
        const boards = response.data
        expect(boards).toHaveLength(1)
        await boardRepository.delete(idBoard)
    })
    test.skip("deve chamar o service /boards/:idBoard", async () => {
        const response = await axios({
            url: `http://localhost:3000/boards/${idBoard}`,
            method: "get"
        })
        const board = response.data
        expect(board.name).toBe("A")
    })
})