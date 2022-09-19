import fs from "fs/promises"
import GetBoard from "../../src/application/GetBoard"
import ImportCards from "../../src/application/ImportCards"
import { Board } from "../../src/domain/entities/Board"
import BoardRepositoryMemory from "../../src/infra/repositories/memory/BoardRepositoryMemory"

describe("ImportCards", () => {
    test("Deve importar cards a partir do arquivo no formato .csv", async () => {
        const file = await fs.readFile('../data/cards.csv')
        const boardRepository = new BoardRepositoryMemory()
        const board = new Board(1, "A", "desc")
        board.addColumn('todo', true)
        board.addColumn('doing', true)
        board.addColumn('done', false)
        await boardRepository.save(board)
        const importCards = new ImportCards(boardRepository)
        const input = { idBoard: 1, file }
        await importCards.execute(input)

        const getBoard = new GetBoard(boardRepository)
        const getBoardOutput = await getBoard.execute(1)
        const cards = getBoardOutput.cards
        expect(cards[0].name).toBe("a")
        expect(cards[0].estimative).toBe(3)
        expect(cards[1].name).toBe("b")
        expect(cards[1].estimative).toBe(6)
        expect(cards[2].name).toBe("c")
        expect(cards[2].estimative).toBe(9)
        expect(cards[3].name).toBe("d")
        expect(cards[3].estimative).toBe(12)
    })
})