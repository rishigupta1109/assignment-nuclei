// import { IItemWithTax } from "../classes";
import { typesClassMap } from "../constant";
import { getItemFromString, readALine } from "../utils";
import { Item } from "./Item";

export class SalesTaxCalculator {
  itemsWithTax: Array<Item>;
  constructor() {
    this.itemsWithTax = [];
  }
  askToAddMoreItems(): boolean {
    while (true) {
      try {
        console.log("Do you want to add more items ? (y/n)");
        const answer = readALine();
        if (answer === "n") {
          return false;
        } else if (answer !== "y") {
          throw new Error("Invalid Input");
        } else {
          return true;
        }
      } catch (err: any) {
        console.error(err?.message);
      }
    }
  }
  takeInputItemDetails() {
    console.log("Enter details of item :");
    try {
      const tempItemString = readALine() as string;
      const item = getItemFromString(tempItemString);
      const itemWithTax = typesClassMap[item.type](item);
      this.itemsWithTax.push(itemWithTax);
    } catch (err: any) {
      console.error(err?.message);
    }
  }
  showOutput() {
    console.log("------------------------- x -------------------------");
    console.log(
      "------------------------- Your Items Details -------------------------"
    );
    console.log("Number of Items : ", this.itemsWithTax.length);
    console.table(this.itemsWithTax);
    return this.itemsWithTax;
  }
  showInputInstructions() {
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
  }
  run() {
    this.showInputInstructions();
    while (true) {
      this.takeInputItemDetails();
      if (!this.askToAddMoreItems()) {
        break;
      }
    }
    this.showOutput();
  }
}
