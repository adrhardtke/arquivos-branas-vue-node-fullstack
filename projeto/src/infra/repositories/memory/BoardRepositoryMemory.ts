import { Board } from "../../../domain/entities/Board";
import BoardRepository from "../../../domain/repositories/BoardRepository";

export default class BoardRepositoryMemory implements BoardRepository {
    boards: Board[]
    counter = 0

    constructor(){
        this.boards = []
    }

    async save(board: Board): Promise<number> {
        if(!board.idBoard){
            board.idBoard = this.counter++
        }
        this.boards.push(board)
        return board.idBoard
    }
    async get(idBoard: number): Promise<Board> {
        const board = this.boards.find(board => board.idBoard === idBoard)
        if(!board) throw new Error("Board does not exists")
        return board
    }
    async update(board: Board): Promise<void> {
        await this.delete(board.idBoard)
        this.save(board)
    }
    async delete(idBoard: number): Promise<void> {
        const existingBoard = await this.get(idBoard)
        if(!existingBoard) throw new Error("Board does not exists")
        this.boards.splice(this.boards.indexOf(existingBoard), 1)
    }
    async list(): Promise<Board[]> {
        return this.boards
    }
    
}