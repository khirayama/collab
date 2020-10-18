import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

import { ParagraphItem, Item, ItemType, ItemData } from './Item';

const itemMap = {
  paragraph: ParagraphItem,
};

export class Doc {
  private data: Y.Doc;

  constructor() {
    this.data = this.createDoc();
    const item = this.createItem('paragraph');
    this.append(item);

    this.connect();
  }

  /* Factory */
  private createDoc(): Y.Doc {
    const doc: Y.Doc = new Y.Doc();
    const data = doc.getMap('data');
    const items = new Y.Array<Y.Map<any>>();
    data.set('items', items);
    return doc;
  }

  public createItem(itemType: ItemType): Item {
    const ItemClass = itemMap[itemType];

    let item = null;
    if (ItemClass) {
      item = new ItemClass();
    } else {
      item = new ParagraphItem();
    }
    item.doc = this;
    return item;
  }

  /* Traverse */
  public _first(): Item | null {
    const data = this.data.getMap('data');
    const items: Y.Array<Y.Map<ItemData>> = data.get('items');
    const item: Y.Map<ItemData> | null = items.get(0) || null;
    if (item) {
      const tmp: ItemData = item.toJSON();
      const ItemClass = itemMap[tmp.type];
      const itm = new ItemClass(item);
      itm.doc = this;
      return itm;
    }
    return null;
  }

  public find(): Item | null {
    return null;
  }

  /* Transform */
  public append(item: Item): void {
    const data = this.data.getMap('data');
    const items: Y.Array<any> = data.get('items');
    items.push([item.data]);
  }

  /* Methods */
  public on(event: string, callback: Function) {
    this.data.on(event, callback);
  }

  public toJSON() {
    return this.data.toJSON();
  }

  private connect(): void {
    const wsProvider = new WebsocketProvider('ws://localhost:5001', 'my-roomname', this.data);
    wsProvider.on('status', (event: any) => {
      console.log(event.status);
    });
  }
}
