function callback(param: string): void {
	console.log(param)
}

function go(steps: number, callback: (param: string) => void ){
	let i = 0;
	while(i < steps){
		callback(`${i}`)
		i++
	}
}

// function go(steps: number, callback: Function ){
// 	let i = 0;
// 	while(i < steps){
// 		callback(`${i}`)
// 		i++
// 	}
// }

go(10, callback)


/* Exemplo tipando funcoes */

// function init(a: number, b: number, callback: (a: number, b: number) => (x: string) => string) {
// 	return callback(a,b)
// }

// const sum = init(2,2, function(a: number, b: number): (x: string) => string {
// 	return (x: string) => `${x} ${a + b}`
// })

// console.log(sum("Sum")) // resultado: Sum 4