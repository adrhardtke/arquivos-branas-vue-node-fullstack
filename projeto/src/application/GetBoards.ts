import BoardRepository from "../domain/repositories/BoardRepository"

export default class GetBoards {
    constructor(readonly boardRepository: BoardRepository){}

    async execute(): Promise<Output[]> {
        const boards = await this.boardRepository.list()
        const output: Output[] = []
        for(const board of boards){
            const cards = []
            for (const column of board.columns){
                for(const card of column.cards){
                    cards.push({
                        name: card.name,
                        estimative: card.estimative
                    })
                }
            }
            output.push({
                idBoard: board.idBoard,
                name: board.name,
                cards
            })
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