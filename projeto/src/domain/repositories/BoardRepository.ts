import { Board } from "../entities/Board";
import { Column } from "../entities/Column";

export default interface BoardRepository {
    save (board: Board): Promise<number>
    get (idBoard: number): Promise<Board | undefined>
    update (board: Board): Promise<void>
    delete (idBoard: number): Promise<void>
    list (): Promise<Board[]>
    getColumn (idColumn: number): Promise<Column>
}