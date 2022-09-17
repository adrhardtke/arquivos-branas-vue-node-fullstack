// template method - design pattern
export abstract class Item {
	description: string
	price: number

	constructor(description: string, price: number){
		this.description = description
		this.price = price
	}


	calculateTax() {
		return (this.price * this.getTax()) / 100
	}

	abstract getTax(): number
}

/*
	Diferença da interface e classe abstrata:
	- a classe abstrata permite implementação
*/