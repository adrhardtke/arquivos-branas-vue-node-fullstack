"use strict";
// class Person {
//   name: string
//   age: number
Object.defineProperty(exports, "__esModule", { value: true });
const Beer_1 = require("./Beer");
const Whisky_1 = require("./Whisky");
const persons = [];
persons[0] = { name: 'Adriano Hardtke', age: 25 };
const beer = new Beer_1.Beer("Cerveja", 10);
const wisky = new Whisky_1.Whisky("Whisky", 200);
console.log(beer.calculateTax());
console.log(wisky.calculateTax());
