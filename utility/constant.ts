import { ImportedItem } from "./classes/ImportedItem";
import { Item } from "./classes/Item";
import {
  ImportedItemCreator,
  ManufacturedItemCreator,
  RawItemCreator,
} from "./classes/ItemCreator";

export let typesClassMap = {
  raw: (item: Item) => new RawItemCreator().create(item),
  manufactured: (item: Item) => new ManufacturedItemCreator().create(item),
  imported: (item: Item) => new ImportedItemCreator().create(item),
};
