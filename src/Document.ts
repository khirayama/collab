import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

import { User } from './User';
import { Selection } from './Selection';
import { ParagraphItem, Item, ItemType, ItemDataContent } from './Item';

const itemMap = {
  paragraph: ParagraphItem,
};

/*
 * XXXData: yjsを使ったデータ構造
 * XXXDataJSON: toJSONしたデータ
 */
type SelectionData = {
  compositionText: string;
  range: {
    anchor: {
      id: string;
      offset: Y.RelativePosition;
    };
    focus: {
      id: string;
      offset: Y.RelativePosition;
    };
  } | null;
};

type ItemData = {
  id: string;
  type: string;
  text: Y.Text;
  items: Y.Array<ItemData>;
};

type DocumentData = {
  selection: {
    [id: string]: SelectionData;
  };
  items: Y.Array<ItemData>;
};

export class Document {
  private user: User;

  private data: Y.Doc = new Y.Doc();

  constructor(user: User) {
    this.user = user;
    this.data = new Y.Doc();

    this.connect();
  }

  /* Selection */
  public getSelection(): Selection {
    return new Selection();
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
  public init() {
    const item = this.createItem('paragraph');
    this.append(item);
  }

  public on(event: string, callback: Function) {
    this.data.on(event, callback);
  }

  public toJSON() {
    return this.data.toJSON();
  }

  private connect(): void {
    const wsProvider = new WebsocketProvider('ws://localhost:5001', 'goodwriting', this.data);
    wsProvider.on('status', (event: any) => {
      console.log(event.status);
    });
  }
}
