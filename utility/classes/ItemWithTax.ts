import { Item } from "./Item";

export class ItemWithTax extends Item {
  salesTaxLiabilityPerItem: number;
  finalPrice: number;
  constructor(item: Item) {
    super(item);
    this.salesTaxLiabilityPerItem = 0;
    this.finalPrice = 0;
  }
}
