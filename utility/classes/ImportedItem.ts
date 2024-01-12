import { Item } from "./Item";
import { ItemWithTax } from "./ItemWithTax";

export class ImportedItem extends ItemWithTax {
  constructor(item: Item) {
    super(item);
    let tax = this.calculateTax();
    this.salesTaxLiabilityPerItem = parseFloat(
      (tax / this.quantity).toPrecision(4)
    );
    this.finalPrice = this.price * this.quantity + tax;
  }
  calculateTax(): number {
    let IndividualTax = 0,
      tax = 0;

    IndividualTax = this.price * 0.1;
    tax = IndividualTax;
    const finalPrice = this.price + tax;
    if (finalPrice <= 100) {
      tax += 5;
    } else if (finalPrice > 100 && finalPrice <= 200) {
      tax += 10;
    } else {
      tax += 0.05 * finalPrice;
    }
    return tax * this.quantity;
  }
}
