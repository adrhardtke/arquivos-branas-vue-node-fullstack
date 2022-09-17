// class Person {
//   name: string
//   age: number

import { Beer } from "./Beer"
import { Whisky } from "./Whisky"

//   constructor (name: string, age: number) {
//     this.name = name
//     this.age = age
//   }
// }

type Person = {
  name: string
  age: number
}
const persons: Person[] = []

persons[0] = { name: 'Adriano Hardtke', age: 25 }

const beer = new Beer(10)
const wisky = new Whisky(200)
console.log(beer.calculateTax())
console.log(wisky.calculateTax())

