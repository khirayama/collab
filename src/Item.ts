import * as Y from 'yjs';
import * as uuid from 'uuid';

import { Doc } from './Doc';

export class ParagraphItem {
  public doc: Doc | null = null;

  private data: Y.Map<ItemDataContent>;

  constructor(data?: ParagraphItem['data']) {
    this.data = data
      ? data
      : new Y.Map(
          Object.entries({
            id: uuid.v4(),
            indent: 0,
            type: 'paragraph',
            text: new Y.Text(),
          }),
        );
  }

  public get(key: string) {
    return this.data.get(key);
  }

  public getData() {
    return this.data;
  }

  public after(item: Item): void {
    const currentItemData = this.toJSON();
    const itemsData = this.doc.itemsData();
    for (let i = 0; i < itemsData.length; i += 1) {
      const itemData: Y.Map<ItemDataContent> = itemsData.get(i);
      const itemDataContent: ItemDataContent = itemData.toJSON();
      if (itemDataContent.id === currentItemData.id) {
        itemsData.insert(i + 1, [item.data]);
      }
    }
  }

  public toJSON(): ItemDataContent {
    return this.data.toJSON();
  }
}

export type ItemDataContent = {
  id: string;
  indent: number;
  type: 'paragraph';
  text: Y.Text;
  attributes: {};
};

export type Item = ParagraphItem;

export type ItemType = ReturnType<Item['data']['toJSON']>['type'];
