import readline from "readline-sync";
import { calculateTax, getItemFromString, readALine } from "./utils";
export class IItem {
  name: string;
  price: number;
  quantity: number;
  type: "raw" | "manufactured" | "imported";
  constructor({
    name,
    price,
    quantity,
    type,
  }: {
    name: string;
    price: number;
    quantity: number;
    type: "raw" | "manufactured" | "imported";
  }) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.type = type;
  }
}
export class IItemWithTax extends IItem {
  private salesTaxLiabilityPerItem: number;
  private finalPrice: number;
  constructor(s: string) {
    let item = getItemFromString(s);
    super(item);
    let tax = calculateTax(item);
    this.salesTaxLiabilityPerItem = parseFloat(
      (tax / item.quantity).toPrecision(4)
    );
    this.finalPrice = item.price * item.quantity + tax;
  }
  print(): void {
    console.log(
      this.name,
      this.price,
      this.quantity,
      this.type,
      this.salesTaxLiabilityPerItem,
      this.finalPrice
    );
  }
}

export class SalesTaxCalculator {
  itemsWithTax: IItemWithTax[];
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
      const itemWithTax = new IItemWithTax(tempItemString);
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
