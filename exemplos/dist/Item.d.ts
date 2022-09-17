export declare abstract class Item {
    name: string;
    price: number;
    constructor(name: string, price: number);
    abstract calculateTax(): number;
}
