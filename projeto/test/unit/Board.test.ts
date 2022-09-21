import { Board } from "../../src/domain/entities/Board"
import { Card } from "../../src/domain/entities/Card"
import { Column } from "../../src/domain/entities/Column"

describe('Board', () => {
    it('should create new board with name and description', () => {
        const board = new Board(1, 'TodoList')
        expect(board.name).toBe('TodoList')
    })
    it('should include columns on board', () => {
        const board = new Board(1, 'TodoList')
        board.addColumn(new Column(null, 'Todo', true))
        board.addColumn(new Column(null, 'Doing', true))
        board.addColumn(new Column(null, 'Done', false))
        expect(board.columns).toHaveLength(3)
    })
    it('should associate Card in board columns', () => {
        const board = new Board(1, 'TodoList')
        board.addColumn(new Column(null, 'Todo', true))
        board.addCard('Todo', new Card(null, 'Task 1', 4))
        expect(board.getColumn('Todo').getCards()).toHaveLength(1)
    })
    it('should calculate correctly the estimative of each column', () => {
        const board = new Board(1, 'TodoList')
        board.addColumn(new Column(null, 'Todo', true))
        board.addCard('Todo', new Card(null, 'Task 1', 4))
        board.addCard('Todo', new Card(null, 'Task 2', 3))
        board.addCard('Todo', new Card(null, 'Task 3', 2))
        board.addCard('Todo', new Card(null, 'Task 4', 1))
        expect(board.getColumn('Todo').getEstimative()).toBe(10)
    })
    it('should change the card column', () => {
        const board = new Board(1, 'TodoList')
        board.addColumn(new Column(null, 'Todo', true))
        board.addColumn(new Column(null, 'Doing', true))
        board.addCard('Todo', new Card(null, 'Task 1', 4))
        board.addCard('Todo', new Card(null, 'Task 2', 3))
        board.addCard('Todo', new Card(null, 'Task 3', 2))
        board.addCard('Todo', new Card(null, 'Task 4', 1))
        board.changeColumn('Task 1', 'Todo', 'Doing')
        expect(board.getColumn('Todo').getEstimative()).toBe(6)
        expect(board.getColumn('Doing').getEstimative()).toBe(4)
    })
    it('should add time in each column', () => {
        const board = new Board(1, 'TodoList')
        board.addColumn(new Column(null, 'Todo', true))
        board.addColumn(new Column(null, 'Doing', true))
        board.addCard('Todo', new Card(null, 'Task 1', 4), new Date("2021-03-01T10:00:00"))
        board.changeColumn('Task 1', 'Todo', 'Doing',  new Date("2021-03-10T10:00:00"))
        const card = board.getColumn('Doing').getCard('Task 1')
        expect(card.transitions[0].date).toEqual(new Date("2021-03-01T10:00:00"))
        expect(card.transitions[1].date).toEqual(new Date("2021-03-10T10:00:00"))
    })
})