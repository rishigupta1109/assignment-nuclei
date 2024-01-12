import { ImportedItem } from "./classes/ImportedItem";
import { Item } from "./classes/Item";
import { ManufacturedItem } from "./classes/ManufacturedItem";
import { RawItem } from "./classes/RawItem";

export let typesClassMap = {
  raw: (item: Item) => new RawItem(item),
  manufactured: (item: Item) => new ManufacturedItem(item),
  imported: (item: Item) => new ImportedItem(item),
};
