import { ImportedItem } from "./ImportedItem";
import { Item } from "./Item";
import { ManufacturedItem } from "./ManufacturedItem";
import { RawItem } from "./RawItem";

export abstract class ItemCreator {
  public abstract create(item: Item): Item;
}
export class RawItemCreator extends ItemCreator {
  create(item: Item): Item {
    return new RawItem(item);
  }
}
export class ImportedItemCreator extends ItemCreator {
  create(item: Item): Item {
    return new ImportedItem(item);
  }
}
export class ManufacturedItemCreator extends ItemCreator {
  create(item: Item): Item {
    return new ManufacturedItem(item);
  }
}
