import { Board } from "../../src/domain/entities/Board"

describe('Board', () => {
    it('should create new board with name and description', () => {
        const board = new Board(1, 'TodoList','create things')
        expect(board.name).toBe('TodoList')
        expect(board.description).toBe('create things')
    })
    it('should include columns on board', () => {
        const board = new Board(1, 'TodoList', 'create things')
        board.addColumn('Todo', true)
        board.addColumn('Doing', true)
        board.addColumn('Done', false)
        expect(board.columns).toHaveLength(3)
    })
    it('should associate Card in board columns', () => {
        const board = new Board(1, 'TodoList', 'create things')
        board.addColumn('Todo', true)
        board.addCard('Todo', 'Task 1', 4)
        expect(board.getColumn('Todo').getCards()).toHaveLength(1)
    })
    it('should calculate correctly the estimative of each column', () => {
        const board = new Board(1, 'TodoList', 'create things')
        board.addColumn('Todo', true)
        board.addCard('Todo', 'Task 1', 4)
        board.addCard('Todo', 'Task 2', 3)
        board.addCard('Todo', 'Task 3', 2)
        board.addCard('Todo', 'Task 4', 1)
        expect(board.getColumn('Todo').getEstimative()).toBe(10)
    })
    it('should change the card column', () => {
        const board = new Board(1, 'TodoList', 'create things')
        board.addColumn('Todo', true)
        board.addColumn('Doing', true)
        board.addCard('Todo', 'Task 1', 4)
        board.addCard('Todo', 'Task 2', 3)
        board.addCard('Todo', 'Task 3', 2)
        board.addCard('Todo', 'Task 4', 1)
        board.changeColumn('Task 1', 'Todo', 'Doing')
        expect(board.getColumn('Todo').getEstimative()).toBe(6)
        expect(board.getColumn('Doing').getEstimative()).toBe(4)
    })
    it('should add time in each column', () => {
        const board = new Board(1, 'TodoList', 'create things')
        board.addColumn('Todo', true)
        board.addColumn('Doing', true)
        board.addCard('Todo', 'Task 1', 4, new Date("2021-03-01T10:00:00"))
        board.changeColumn('Task 1', 'Todo', 'Doing',  new Date("2021-03-10T10:00:00"))
        const card = board.getColumn('Doing').getCard('Task 1')
        expect(card.transitions[0].date).toEqual(new Date("2021-03-01T10:00:00"))
        expect(card.transitions[1].date).toEqual(new Date("2021-03-10T10:00:00"))
    })
})