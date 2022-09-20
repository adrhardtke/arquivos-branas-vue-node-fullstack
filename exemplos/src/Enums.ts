enum Category {
	PROGRAMING, // default value = 0
	SCIENCE,
	ENTERTAINMENT
}

// enum Category {
// 	PROGRAMING = "Programing",
// 	SCIENCE = "Science,
// 	ENTERTAINMENT = "Entertainment"
// }


class Book_ {
	constructor(readonly titlte: string, readonly category: Category){}
}

const book = new Book_('Clean code', Category.PROGRAMING)
console.log(book)

