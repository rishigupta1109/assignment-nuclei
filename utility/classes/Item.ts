import { getItemFromString } from "../utils";

export class Item {
  name: string;
  price: number;
  quantity: number;
  type: "raw" | "manufactured" | "imported";
  constructor(item: {
    name: string;
    price: number;
    quantity: number;
    type: "raw" | "manufactured" | "imported";
  }) {
    let { name, price, quantity, type } = item;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.type = type;
  }
}
