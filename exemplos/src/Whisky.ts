import { Item } from "./Item"

export class Whisky extends Item {

      constructor(price: number) {
        super("Whisky", price)
    }


     getTax(): number {
        return 20
    }


}