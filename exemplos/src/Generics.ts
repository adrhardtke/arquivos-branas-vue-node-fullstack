class Book {
	constructor(readonly title: string){}
}

class Car {
	constructor(readonly model: string){}
}

class Repository<T> { // class Repository<T extends Vehicle> {
	list: T[]

	constructor(){
		this.list = []
	}

	add(el: T){
		this.list.push(el)
	}
}

const repoBook = new Repository<Book>()
repoBook.add(new Book("clean code"))

const repoCar = new Repository<Car>()
repoCar.add(new Car("audi"))