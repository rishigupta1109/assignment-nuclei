import { IItem } from "./classes";

export function readALine(): string {
  const readline = require("readline-sync");
  return readline.question("");
}

export function isValidItemDetailsString(s: string): boolean {
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
  let IndividualTax = 0,
    tax = 0;
  if (item.type === "raw") {
    IndividualTax = item.price * 0.125;
    tax = IndividualTax * item.quantity;
  } else if (item.type === "manufactured") {
    IndividualTax =
      item.price * 0.125 + 0.02 * (item.price + item.price * 0.125);
    tax = IndividualTax * item.quantity;
  } else if (item.type === "imported") {
    IndividualTax = item.price * 0.1;
    tax = IndividualTax * item.quantity;
    const finalPrice = item.price + tax;
    if (finalPrice <= 100) {
      tax += 5;
    } else if (finalPrice > 100 && finalPrice <= 200) {
      tax += 10;
    } else {
      tax += 0.05 * finalPrice;
    }
  }
  return tax;
}

export function getItemFromString(s: string): IItem {
  const example = "-name Soap -price 10 -quantity 10 -type raw";
  if (!isValidItemDetailsString(s)) {
    throw new Error("Invalid Input");
  }
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
