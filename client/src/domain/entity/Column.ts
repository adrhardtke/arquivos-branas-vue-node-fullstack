import Card from "./Card";

export default class Column {
    cards: Card[]

    constructor(public name: string, public hasEstimative: boolean = true){
        this.cards = []
    }

    addCard(title: string, estimative: number){
        this.cards.push(new Card(title, estimative))
    }

    deleteCard(card: Card){
        this.cards.splice(this.cards.indexOf(card), 1)
    }

    getEstimative(){
        if(!this.hasEstimative) return 0
        return this.cards.reduce((total, card) => total += card.estimative, 0)
    }
}