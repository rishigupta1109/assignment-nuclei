import { Item } from "./Item";
import { ItemWithTax } from "./ItemWithTax";

export class ManufacturedItem extends ItemWithTax {
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
    IndividualTax =
      this.price * 0.125 + 0.02 * (this.price + this.price * 0.125);
    tax = IndividualTax * this.quantity;
    return tax;
  }
}
