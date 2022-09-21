import fs from "fs/promises"
import { Card } from "../../src/domain/entities/Card"
import ExportCards from "../../src/application/ExportCards"
import BoardRepositoryMemory from "../../src/infra/repositories/memory/BoardRepositoryMemory"
import { Board } from "../../src/domain/entities/Board"
import { Column } from "../../src/domain/entities/Column"
import Connection from "../../src/infra/database/Connection"
import BoardRepository from "../../src/domain/repositories/BoardRepository"
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection"
import BoardRepositoryDatabase from "../../src/infra/repositories/database/BoardRepositoryDatabase"

let connection: Connection
let boardRepository: BoardRepository

describe('BoardRepositoryDatabase', () => {
    beforeAll(async () => {
        connection = new PgPromiseConnection()
        boardRepository = new BoardRepositoryDatabase(connection)
    })
    afterAll(async () => {
        await connection.close()
    })
    test("Deve exportar os cards", async () => {
        const boardRepository = new BoardRepositoryMemory()
        const board = new Board(1, "A")
        board.addColumn(new Column(null, 'todo', true))
        board.addColumn(new Column(null, 'doing', true))
        board.addColumn(new Column(null, 'done', false))
        board.addCard("todo", new Card(null, "a",3))
        board.addCard("todo", new Card(null, "b",6))
        board.addCard("todo", new Card(null, "c",9))
        board.addCard("todo", new Card(null, "d",12))
        await boardRepository.save(board)
        const exportCards = new ExportCards(boardRepository)
        if(!board.idBoard) return
        const file = await exportCards.execute(board.idBoard)
        expect(file.toString()).toBe("card_title;card_estimative\na;3\nb;6\nc;9\nd;12")
    })
    test("Deve exportar os cards", async () => {
        const board = new Board(null, "A")
        board.addColumn(new Column(null, 'todo', true))
        board.addColumn(new Column(null, 'doing', true))
        board.addColumn(new Column(null, 'done', false))
        board.addCard("todo", new Card(null, "a",3))
        board.addCard("todo", new Card(null, "b",6))
        board.addCard("todo", new Card(null, "c",9))
        board.addCard("todo", new Card(null, "d",12))
        const idBoard = await boardRepository.save(board)
        const exportCards = new ExportCards(boardRepository)
        if(!board.idBoard) return
        const file = await exportCards.execute(idBoard)
        expect(file.toString()).toBe("card_title;card_estimative\na;3\nb;6\nc;9\nd;12")
        await boardRepository.delete(idBoard)
    })
})