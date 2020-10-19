import { Doc } from './Doc';
import { Item } from './Item';
import { Selection } from './Selection';

export const action = {
  addItem: (doc: Doc, selection: Selection) => {
    const selectionDataContent = selection.toJSON();

    const item: Item = doc.createItem('paragraph');
    if (selectionDataContent.range) {
      const currentItem = doc.find(selection.data.range.anchor.id);
      currentItem.after(item);
    }
    // const data = doc.getMap('data');
    // let items: Y.Array<any> | null = data.get('items');
    // if (items === null) {
    //   items = new Y.Array();
    //   data['items'] = items;
    // }
    // let item: Y.Map<any> | null = items.get(0);
    // if (!item) {
    //   // item = new Y.Map();
    //   item = doc.createItem();
    //   items.push([item]);
    // }
    // let text = item.get('text');
    // if (!text) {
    //   text = new Y.Text();
    //   item.set('text', text);
    // }
    // text.insert(0, 'AAA', { bold: true });
    // text.insert(1, 'BBB', { bold: false });
  },
};
