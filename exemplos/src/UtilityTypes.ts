interface Todo {
	priority: number
	description: string
	done: boolean
}

const todo: Todo = {
	priority: 1,
	description: 'Programar',
	done: false
}

function update(updateTodo: Partial<Todo>){ // o partial é pra dizer que posso passar por parametro, parte da interface
	return {...todo, ...updateTodo}
}

// ----------- PICK
// function update(updateTodo: Pick<Todo, "done" | "priority">){ // só pode receber o done e priority do Todo
// 	return {...todo, ...updateTodo}
// }


// ----------- OMIT
// function update(updateTodo: Omit<Todo, "description">){ // só pode não pode receber o description do Todo, o resto todo pode passar
// 	return {...todo, ...updateTodo}
// }


// ----------- REQUIRED
// const todo: Required<Todo> = {
// 	//  tem que passar todos parametros de Todo, mesmo que haja algum opcional
// }

// ------------ READONLY
// const todo: Readonly<Todo> = {
	// description: 'x',
	// done: true,
	// priority: 1
// }
// todo.done = false // ERRO! Com o Readonly<Todo> NAO PODE MODIFICAR



const updatedTodo = update({done: true})