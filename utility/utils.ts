import { IItem, IItemWithTax } from "./interface";
import readline from "readline-sync";

export function readALine(): string {
  const answer = readline.question("");
  return answer;
}
export function isValidItemDetailsString(s: string): boolean {
  const example = "-name Soap -price 10 -quantity 10 -type raw";
  let pattern =
    /^-name\s\S+(?=.*-price\s\d+)(?=.*-quantity\s\d+)(?=.*-type\s(raw|manufactured|imported)).*$/;
  if (!pattern.test(s)) {
    return false;
  }

  let nameMatch = s.match(/-name\s(\S+)/g);
  let priceMatch = s.match(/-price\s(\d+)/g);
  let quantityMatch = s.match(/-quantity\s(\d+)/g);
  let typeMatch = s.match(/-type\s(raw|manufactured|imported)/g);
  if (!nameMatch || !priceMatch || !quantityMatch || !typeMatch) {
    return false;
  }
  if (nameMatch && nameMatch.length > 1) {
    console.log("Multiple names found");
    return false;
  }
  if (priceMatch && priceMatch.length > 1) {
    console.log("Multiple Price found");
    return false;
  }
  if (quantityMatch && quantityMatch.length > 1) {
    console.log("Multiple Quantity found");
    return false;
  }
  if (typeMatch && typeMatch.length > 1) {
    console.log("Multiple Type found");
    return false;
  }

  return true;
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
  if (!isValidItemDetailsString(s)) {
    throw new Error("Invalid Input");
  }

  // let parts = s.split("-");
  // parts.shift();
  // for (let p of parts) {
  //   let arr = p.split(" ");
  //   let key = arr[0];
  //   arr.shift();
  //   let value: string = arr.join(" ");
  //   Item[key] = value;
  //   if (key === "price" || key === "quantity") {
  //     Item[key] = parseFloat(value);
  //   }
  // }

  let nameMatch = s.match(/-name (\S+)/g);
  let priceMatch = s.match(/-price (\d+)/);
  let quantityMatch = s.match(/-quantity (\d+)/);
  let typeMatch = s.match(/-type (raw|manufactured|imported)/);

  let name = nameMatch ? nameMatch[0].split(" ")[1] : null;
  let price = priceMatch ? Number(priceMatch[1]) : null;
  let quantity = quantityMatch ? Number(quantityMatch[1]) : null;
  let type = typeMatch ? typeMatch[1] : null;
  if (
    !name ||
    !price ||
    !quantity ||
    !type ||
    (type !== "raw" && type !== "manufactured" && type !== "imported")
  ) {
    throw new Error("Invalid Input");
  }
  let Item: IItem = {
    name,
    price,
    quantity,
    type,
  };
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
