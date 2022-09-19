import { Board } from "../../src/domain/entities/Board"
import BoardRepositoryMemory from "../../src/infra/repositories/memory/BoardRepositoryMemory"

describe('BoardRepositoryMemory', () => {
    it('deve salvar um board', async () => {
        const boardRepository = new BoardRepositoryMemory()
        const board = new Board(1, "A", "desc")
        board.addColumn('todo', true)
        board.addColumn('doing', true)
        board.addColumn('done', false)
        const idBoard = await boardRepository.save(board)
        expect(idBoard).toBe(1)
    })
    it('deve consultar um board', async () => {
        const boardRepository = new BoardRepositoryMemory()
        const board = new Board(1, "A", "desc")
        board.addColumn('todo', true)
        board.addColumn('doing', true)
        board.addColumn('done', false)
        await boardRepository.save(board)
        const existingBoard = await boardRepository.get(1)
        expect(existingBoard).toBe(board)
        expect(existingBoard?.columns).toHaveLength(3)
    })
    it('deve atualizar um board', async () => {
        const boardRepository = new BoardRepositoryMemory()
        const board = new Board(1, "A", "desc")
        board.addColumn('todo', true)
        board.addColumn('doing', true)
        board.addColumn('done', false)
        const idBoard = await boardRepository.save(board)
        const existingBoard = await boardRepository.get(1)
        existingBoard.addColumn("test",true)
        await boardRepository.update(existingBoard)
        const existingBoardAfterUpdate = await boardRepository.get(1)
        expect(existingBoardAfterUpdate?.columns).toHaveLength(4)
    })
})