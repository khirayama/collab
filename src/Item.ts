import * as Y from 'yjs';
import * as uuid from 'uuid';

import { Doc } from './Doc';

export class ParagraphItem {
  public doc: Doc | null = null;

  public data: Y.Map<ItemData>;

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

  public after(item: Item) {
    console.log(item);
  }
}

export type ItemData = {
  id: string;
  indent: number;
  type: 'paragraph';
  text: Y.Text;
  attributes: {};
};

export type Item = ParagraphItem;

export type ItemType = ReturnType<Item['data']['toJSON']>['type'];
