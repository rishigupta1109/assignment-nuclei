import { IItem, IItemWithTax } from "./interface";
import readline from "readline-sync";

export function readALine(): string {
  const answer = readline.question("");
  return answer;
}

export function calculateTax(item: IItem): number {
  let tax = 0;
  if (item.type === "raw") {
    tax = item.price * 0.125;
  } else if (item.type === "manufactured") {
    tax = item.price * 0.125 + 0.02 * (item.price + item.price * 0.125);
  } else if (item.type === "imported") {
    tax = item.price * 0.1;
    const finalPrice = item.price + tax;
    if (finalPrice <= 100) {
      tax += 5;
    } else if (finalPrice > 100 && finalPrice <= 200) {
      tax += 10;
    } else {
      tax += 0.05 * (item.price + tax);
    }
  }
  return tax;
}

export function getItemFromString(s: string): IItem {
  const example = "-name Soap -price 10 -quantity 10 -type raw";

  let Item: IItem = {
    name: "",
    price: 0,
    quantity: 0,
    type: "raw",
  };
  let parts = s.split("-");
  parts.shift();
  for (let p of parts) {
    let arr = p.split(" ");
    let key = arr[0];
    arr.shift();
    let value: string = arr.join(" ");
    Item[key] = value;
    if (key === "price" || key === "quantity") {
      Item[key] = parseFloat(value);
    }
  }
  return Item;
}

export function getItemWithTax(item: IItem): IItemWithTax {
  let itemWithTax: IItemWithTax;
  let tax = calculateTax(item);
  let finalPrice = item.price + tax;
  let salesTaxLiabilityPerItem = tax / item.quantity;
  itemWithTax = {
    ...item,
    finalPrice,
    salesTaxLiabilityPerItem,
  };
  return itemWithTax;
}

export function add(a: number, b: number): number {
  return a + b;
}
