import { Card } from "./Card";

export class Column {
    cards: Card[]
    constructor(readonly name: string, readonly hasEstimative: boolean){
        this.cards = []
    }

    addCard(card: Card, date: Date){
        card.addTransition(this.name, date)
        this.cards.push(card)
    }

    getCards(){
        return this.cards
    }

    getCard(name: string){
        const card = this.cards.find(card => card.name === name)
        if(!card) throw new Error('Card does not exists')
        return card
    }

    remove(card: Card) {
       this.cards.splice(this.cards.indexOf(card), 1)
    }

    getEstimative(){
        if(!this.hasEstimative) throw new Error('Column is not estimated')
        const estimative = this.cards.reduce((total: number, card: Card) => {
            return card.estimative + total
        }, 0)
        return estimative
    }
}