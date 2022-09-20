import { Board } from "../../src/domain/entities/Board"
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection"
import BoardRepositoryDatabase from "../../src/infra/repositories/database/BoardRepositoryDatabase"
import BoardRepositoryMemory from "../../src/infra/repositories/memory/BoardRepositoryMemory"

describe('BoardRepositoryDatabase', () => {
    it('deve salvar um board', async () => {
        const connection = new PgPromiseConnection()
        const boardRepository = new BoardRepositoryDatabase(connection)
        const board = new Board(null, "A")
        board.addColumn('todo', true)
        board.addColumn('doing', true)
        board.addColumn('done', false)
        const idBoard = await boardRepository.save(board)
        expect(idBoard).toBeGreaterThan(1)
    })
    it.skip('deve consultar um board', async () => {
        const boardRepository = new BoardRepositoryMemory()
        const board = new Board(1, "A")
        board.addColumn('todo', true)
        board.addColumn('doing', true)
        board.addColumn('done', false)
        await boardRepository.save(board)
        const existingBoard = await boardRepository.get(1)
        expect(existingBoard).toBe(board)
        expect(existingBoard?.columns).toHaveLength(3)
    })
    it.skip('deve atualizar um board', async () => {
        const boardRepository = new BoardRepositoryMemory()
        const board = new Board(1, "A")
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