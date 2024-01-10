export interface IItem {
  [key: string]: any;
  name: string;
  price: number;
  quantity: number;
  type: "raw" | "manufactured" | "imported";
}
export interface IItemWithTax extends IItem {
  salesTaxLiabilityPerItem: number;
  finalPrice: number;
}
