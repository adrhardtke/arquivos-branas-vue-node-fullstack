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

    addColumn(column: Column){
        this.columns.push(column)
    }

    getColumn(name: string) {
        const column = this.columns.find(column => column.name === name)
        if(!column) throw new Error('Column does not exists')
        return column
    }

    addCard(columnName: string, card: Card, date: Date = new Date()){
        const column = this.getColumn(columnName)
        column.addCard(card, date)
    }

    changeColumn(cardName: string, from: string, to: string, date: Date = new Date()){
        const card = this.getColumn(from).getCard(cardName)
        this.getColumn(from).remove(card)
        this.getColumn(to).addCard(card, date)
    }
}