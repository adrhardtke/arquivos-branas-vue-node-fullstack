import axios from 'axios'
import { Board } from '../../src/domain/entities/Board'
import { Card } from '../../src/domain/entities/Card'
import { Column } from '../../src/domain/entities/Column'
import BoardRepository from '../../src/domain/repositories/BoardRepository'
import Connection from '../../src/infra/database/Connection'
import PgPromiseConnection from '../../src/infra/database/PgPromiseConnection'
import BoardRepositoryDatabase from '../../src/infra/repositories/database/BoardRepositoryDatabase'

let connection: Connection
let boardRepository: BoardRepository
let idBoard: number

describe.only("Graphql", () => {
    beforeAll(async () => {
        connection = new PgPromiseConnection()
        boardRepository = new BoardRepositoryDatabase(connection)
        const board = new Board(null, "A")
        board.addColumn(new Column(null, 'todo', true))
        board.addColumn(new Column(null, 'doing', true))
        board.addColumn(new Column(null, 'done', false))
        board.addCard("todo", new Card(null, "A", 3))
        board.addCard("todo", new Card(null, "B", 6))
        board.addCard("todo", new Card(null, "C", 9))
        idBoard = await boardRepository.save(board)
    })
    afterAll(async () => {
        await boardRepository.delete(idBoard)
        await connection.close()
    })
    test("deve chamar o graphql", async () => {
        const response = await axios({
            url: "http://localhost:3000",
            method: "post",
            headers: {
                "Content-type":"application/json"
            },
            data: {
                query: `
                    {
                        boards {
                            name
                            columns {
                                name
                                cards {
                                    title
                                    estimative
                                }
                            }
                        }
                    }
                `
            }
        })
        const query = response.data
        console.log(JSON.stringify(query.data))
        const boards = query.data.boards
        expect(boards).toHaveLength(1)
        const [board] = boards
        expect(board.name).toBe("A")
    })
})