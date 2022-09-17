import { Item } from "./Item"

export class Beer extends Item {

    constructor(price: number) {
        super("Beer", price)
    }

    getTax(): number {
     	return 10
    }

}