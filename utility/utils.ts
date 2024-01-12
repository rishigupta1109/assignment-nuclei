import { Item } from "./classes/Item";

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

export function getItemFromString(s: string): Item {
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
  let Item: Item = {
    name,
    price,
    quantity,
    type,
  };
  return Item;
}
