import { Board } from "../../src/domain/entities/Board"
import { Column } from "../../src/domain/entities/Column"
import BoardRepository from "../../src/domain/repositories/BoardRepository"
import Connection from "../../src/infra/database/Connection"
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection"
import BoardRepositoryDatabase from "../../src/infra/repositories/database/BoardRepositoryDatabase"
import BoardRepositoryMemory from "../../src/infra/repositories/memory/BoardRepositoryMemory"

let connection: Connection
let boardRepository: BoardRepository

describe.skip('BoardRepositoryDatabase', () => {
    beforeAll(async () => {
        connection = new PgPromiseConnection()
        boardRepository = new BoardRepositoryDatabase(connection)
    })
    afterAll(async () => {
        await connection.close()
    })
    it('deve salvar um board', async () => {        
        const board = new Board(null, "A")
        board.addColumn(new Column(null, 'todo', true))
        board.addColumn(new Column(null, 'doing', true))
        board.addColumn(new Column(null, 'done', false))
        const idBoard = await boardRepository.save(board)
        expect(idBoard).toBeGreaterThan(1)
        await boardRepository.delete(idBoard)
    })
    it('deve consultar um board', async () => {
        const board = new Board(null, "A")
        board.addColumn(new Column(null, 'todo', true))
        board.addColumn(new Column(null, 'doing', true))
        board.addColumn(new Column(null, 'done', false))
        const idBoard = await boardRepository.save(board)
        const existingBoard = await boardRepository.get(idBoard)
        expect(existingBoard?.name).toBe("A")
        expect(existingBoard?.columns).toHaveLength(3)
        await boardRepository.delete(idBoard)
    })
    it('deve atualizar um board', async () => {
        const board = new Board(null, "A")
        board.addColumn(new Column(null, 'todo', true))
        board.addColumn(new Column(null, 'doing', true))
        board.addColumn(new Column(null, 'done', false))
        const idBoard = await boardRepository.save(board)
        const existingBoard = await boardRepository.get(idBoard)
        if(!existingBoard) return
        existingBoard.addColumn(new Column(null, "test",true))
        await boardRepository.update(existingBoard)
        const existingBoardAfterUpdate = await boardRepository.get(idBoard)
        expect(existingBoardAfterUpdate?.columns).toHaveLength(4)
        await boardRepository.delete(idBoard)
    })
    it('deve apagar um board', async () => {        
        const board = new Board(null, "A")
        board.addColumn(new Column(null, 'todo', true))
        board.addColumn(new Column(null, 'doing', true))
        board.addColumn(new Column(null, 'done', false))
        const idBoard = await boardRepository.save(board)
        await boardRepository.delete(idBoard)
        expect(async () => await boardRepository.get(idBoard)).rejects.toThrow(new Error("Board does not exists"))
    })
    it('deve listar os boards', async () => {        
        const boardA = new Board(null, "A")
        boardA.addColumn(new Column(null, 'todo', true))
        boardA.addColumn(new Column(null, 'doing', true))
        boardA.addColumn(new Column(null, 'done', false))
        const idBoardA = await boardRepository.save(boardA)

        const boardB = new Board(null, "B")
        boardB.addColumn(new Column(null, 'todo', true))
        boardB.addColumn(new Column(null, 'doing', true))
        boardB.addColumn(new Column(null, 'done', false))
        const idBoardB = await boardRepository.save(boardB)

        const boards = await boardRepository.list()
        expect(boards).toHaveLength(2)
        await boardRepository.delete(idBoardA)
        await boardRepository.delete(idBoardB)
    })
})