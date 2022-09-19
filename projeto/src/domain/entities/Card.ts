import { Transition } from "./Transition"

export class Card {
    transitions: Transition[]
    constructor(readonly name: string, readonly estimative: number){
        this.transitions = []
    }

    addTransition(columnName: string, date: Date){
        this.transitions.push(new Transition(columnName, date))
    }
}