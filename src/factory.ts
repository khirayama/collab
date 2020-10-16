import * as uuid from 'uuid';
import * as Y from 'yjs';

export const factory = {
  createDoc: () => {
    const doc: Y.Doc = new Y.Doc();
    const data = doc.getMap('data');
    const items = new Y.Array();
    data.set('items', items);
    return doc;
  },

  createItem: () => {
    return new Y.Map(
      Object.entries({
        id: uuid.v4(),
        indent: 0,
        type: 'paragraph',
        text: new Y.Text(),
      }),
    );
  },
};
