import fs from "fs/promises"
import { Card } from "../../src/domain/entities/Card"
import ExportCards from "../../src/application/ExportCards"
import BoardRepositoryMemory from "../../src/infra/repositories/memory/BoardRepositoryMemory"
import { Board } from "../../src/domain/entities/Board"

describe("ExportCards", () => {
    test("Deve exportar os cards", async () => {
        const boardRepository = new BoardRepositoryMemory()
        const board = new Board(1, "A")
        board.addColumn('todo', true)
        board.addColumn('doing', true)
        board.addColumn('done', false)
        board.addCard("todo","a",3)
        board.addCard("todo","b",6)
        board.addCard("todo","c",9)
        board.addCard("todo","d",12)
        await boardRepository.save(board)
        const exportCards = new ExportCards(boardRepository)
        const file = await exportCards.execute(board.idBoard)
        expect(file.toString()).toBe("card_title;card_estimative\na;3\nb;6\nc;9\nd;12")
    })
})