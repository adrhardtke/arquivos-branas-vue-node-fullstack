import GetBoard from "../../src/application/GetBoard"
import { Board } from "../../src/domain/entities/Board"
import BoardRepositoryMemory from "../../src/infra/repositories/memory/BoardRepositoryMemory"

describe("GetBoard", () => {
    test("deve obter um quadro", async () => {
        const boardRepository = new BoardRepositoryMemory()
        const board = new Board(1, "A")
        board.addColumn('todo', true)
        board.addColumn('doing', true)
        board.addColumn('done', false)
        board.addCard("todo","a",3)
        await boardRepository.save(board)

        const getBoard = new GetBoard(boardRepository)
        const getBoardOutput = await getBoard.execute(1)
        const cards = getBoardOutput.cards
        expect(cards[0].name).toBe("a")
        expect(cards[0].estimative).toBe(3)
    })
})