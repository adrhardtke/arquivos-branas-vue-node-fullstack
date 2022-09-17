"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Whisky = void 0;
const Item_1 = require("./Item");
class Whisky extends Item_1.Item {
    calculateTax() {
        return (this.price * 20) / 100;
    }
}
exports.Whisky = Whisky;
