import BoardRepository from "../domain/repositories/BoardRepository"

export default class GetBoard {
    constructor(readonly boardRepository: BoardRepository){}

    async execute(idBoard: number): Promise<Output> {
        const board = await this.boardRepository.get(idBoard)
        if(!board) throw new Error("board not found")
        const output: Output = {
            idBoard: board.idBoard,
            name: board.name,
            cards: []
        }
        for (const column of board.columns){
            for(const card of column.cards){
                output.cards.push({
                    name: card.name,
                    estimative: card.estimative
                })
            }
        }
        return output
    }
}

type Output = {
    idBoard: number | null,
    name: string,
    cards: {
        name: string,
        estimative: number
    }[]
}