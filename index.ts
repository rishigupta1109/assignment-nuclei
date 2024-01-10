import { IItem, IItemWithTax } from "./utility/interface";
import { getItemFromString, getItemWithTax, readALine } from "./utility/utils";

console.log(
  "------------------------- Welcome to Sales Tax Calculator -------------------------"
);
console.log(
  "------------------------- Nuclei`s own Sales Tax Calculator -------------------------"
);
console.log("!!! Instructions !!!");
console.log("!!! Write details of items in format !!!");
console.log(
  "!!! -name <ItemName> -price <ItemPrice> -quantity <quantity> -type <type> !!!"
);
console.log("!!!All Fields mandatory , Name should come first  !!!");
console.log("------------------------- x -------------------------");
const items: IItem[] = [];
const itemsWithTax: IItemWithTax[] = [];
while (true) {
  console.log("Enter details of item :");
  const tempItemString = readALine() as string;
  const item: IItem = getItemFromString(tempItemString);
  console.log("item", item);
  items.push(item);
  const itemWithTax: IItemWithTax = getItemWithTax(item);
  console.log("itemwithtax", itemWithTax);
  itemsWithTax.push(itemWithTax);
  console.log("Do you want to add more items ? (y/n)");
  const answer = readALine();
  if (answer === "n") {
    break;
  }
}

console.log("------------------------- x -------------------------");
console.log(
  "------------------------- Your Items Details -------------------------"
);
for (let item of itemsWithTax) {
  console.log(`--------`);
  console.log(item);
  console.log(`--------`);
}
