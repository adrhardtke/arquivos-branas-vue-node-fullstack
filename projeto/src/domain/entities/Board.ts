import { Card } from "./Card"
import { Column } from "./Column"

export class Board {
    /**
     * O Board, no DDD, é o agregate
     * O agregate é o cluster de objetos de dominio, que neste caso são:
     * Board, Column, Card, Transition...
     */
    columns: Column[]
    
    constructor(public idBoard: number | null, readonly name: string){
        this.columns = []
    }

    addColumn(name: string, hasEstimative: boolean){
        this.columns.push(new Column(name, hasEstimative))
    }

    getColumn(name: string) {
        const column = this.columns.find(column => column.name === name)
        if(!column) throw new Error('Column does not exists')
        return column
    }

    addCard(columnName: string, cardName: string, estimative: number, date: Date = new Date()){
        const column = this.getColumn(columnName)
        column.addCard(new Card(cardName, estimative), date)
    }

    changeColumn(cardName: string, from: string, to: string, date: Date = new Date()){
        const card = this.getColumn(from).getCard(cardName)
        this.getColumn(from).remove(card)
        this.getColumn(to).addCard(card, date)
    }
}