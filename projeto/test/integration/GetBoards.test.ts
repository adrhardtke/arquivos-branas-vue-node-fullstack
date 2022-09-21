import GetBoards from "../../src/application/GetBoards"
import { Board } from "../../src/domain/entities/Board"
import { Card } from "../../src/domain/entities/Card"
import { Column } from "../../src/domain/entities/Column"
import BoardRepository from "../../src/domain/repositories/BoardRepository"
import Connection from "../../src/infra/database/Connection"
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection"
import BoardRepositoryDatabase from "../../src/infra/repositories/database/BoardRepositoryDatabase"
import BoardRepositoryMemory from "../../src/infra/repositories/memory/BoardRepositoryMemory"


let connection: Connection
let boardRepository: BoardRepository

describe.skip("GetBoards", () => {
    beforeAll(async () => {
        connection = new PgPromiseConnection()
        boardRepository = new BoardRepositoryDatabase(connection)
    })
    afterAll(async () => {
        await connection.close()
    })
    test.skip("deve obter os quadros", async () => {
        const boardRepository = new BoardRepositoryMemory()
        const board = new Board(1, "A")
        board.addColumn(new Column(null, 'todo', true))
        board.addColumn(new Column(null, 'doing', true))
        board.addColumn(new Column(null, 'done', false))
        board.addCard("todo", new Card(null, "a",3))
        await boardRepository.save(board)

        const getBoard = new GetBoards(boardRepository)
        const getBoardOutput = await getBoard.execute()
        const cards = getBoardOutput[0].cards
        expect(cards[0].name).toBe("a")
        expect(cards[0].estimative).toBe(3)
    })
    test("deve obter os quadro usando database", async () => {
        const board = new Board(null, "A")
        board.addColumn(new Column(null, 'todo', true))
        board.addColumn(new Column(null, 'doing', true))
        board.addColumn(new Column(null, 'done', false))
        board.addCard("todo", new Card(null, "a",3))
        await boardRepository.save(board)

        const getBoards = new GetBoards(boardRepository)
        const output = await getBoards.execute()
        expect(output).toHaveLength(1)
        if(!output[0].idBoard) return
        await boardRepository.delete(output[0].idBoard)
    })
})