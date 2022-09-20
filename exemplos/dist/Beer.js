"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beer = void 0;
const Item_1 = require("./Item");
class Beer extends Item_1.Item {
    calculateTax() {
        return (this.price * 10) / 100;
    }
}
exports.Beer = Beer;
