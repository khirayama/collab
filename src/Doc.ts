import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

import { ParagraphItem, Item, ItemType, ItemDataContent } from './Item';

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
  public itemsData() {
    const data = this.data.getMap('data');
    const itemsData: Y.Array<Y.Map<ItemDataContent>> = data.get('items');
    return itemsData;
  }

  public _first(): Item | null {
    const data = this.data.getMap('data');
    const itemsData: Y.Array<Y.Map<ItemDataContent>> = data.get('items');
    const itemData: Y.Map<ItemDataContent> | null = itemsData.get(0) || null;
    if (itemData) {
      const itemDataContent = itemData.toJSON();
      const ItemClass = itemMap[itemDataContent.type];
      const itm = new ItemClass(itemData);
      itm.doc = this;
      return itm;
    }
    return null;
  }

  public find(itemId: string): Item | null {
    const data = this.data.getMap('data');
    const itemsData: Y.Array<Y.Map<ItemDataContent>> = data.get('items');
    for (let i = 0; i < itemsData.length; i += 1) {
      const itemData: Y.Map<ItemDataContent> = itemsData.get(i);
      const itemDataContent: ItemDataContent = itemData.toJSON();
      if (itemDataContent.id === itemId) {
        const itemDataContent = itemData.toJSON();
        const ItemClass = itemMap[itemDataContent.type];
        const itm = new ItemClass(itemData);
        itm.doc = this;
        return itm;
      }
    }
    return null;
  }

  /* Transform */
  public append(item: Item): void {
    const data = this.data.getMap('data');
    const items: Y.Array<any> = data.get('items');
    items.push([item.getData()]);
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
