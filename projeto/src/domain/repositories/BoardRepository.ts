import { Board } from "../entities/Board";

export default interface BoardRepository {
    save (board: Board): Promise<number>
    get (idBoard: number): Promise<Board | undefined>
    update (board: Board): Promise<void>
    delete (idBoard: number): Promise<void>
    list (): Promise<Board[]>
}