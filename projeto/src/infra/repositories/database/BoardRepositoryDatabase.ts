import { Board } from "../../../domain/entities/Board";
import BoardRepository from "../../../domain/repositories/BoardRepository";
import Connection from "../../database/Connection";

export default class BoardRepositoryDatabase implements BoardRepository {

    constructor(readonly connection: Connection){}

    async save(board: Board): Promise<number> {
        const [boardData] = await this.connection.query("insert into kanban.board (name) values ($1) returning *",[board.name])
        return boardData.idBoard
    }
    get(idBoard: number): Promise<Board | undefined> {
        throw new Error("Method not implemented.");
    }
    update(board: Board): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(idBoard: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Board[]> {
        throw new Error("Method not implemented.");
    }
    
}