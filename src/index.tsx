import * as Y from 'yjs';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Doc } from './Doc';
import { factory } from './factory';
import { DebugHelper } from './components/DebugHelper';

type EditorProps = {};

type EditorState = {
  text: string;
};

class Editor extends React.Component<EditorProps, EditorState> {
  constructor(props: EditorProps) {
    super(props);

    this.state = {
      text: JSON.stringify(doc.toJSON(), null, 2),
    };
  }

  public componentDidMount(): void {
    doc.on('update', () => {
      this.setState({
        text: JSON.stringify(doc.toJSON(), null, 2),
      });
    });
  }

  private onClick(): void {
    const data = doc.getMap('data');
    let items: Y.Array<any> | null = data.get('items');
    if (items === null) {
      items = new Y.Array();
      data['items'] = items;
    }
    let item: Y.Map<any> | null = items.get(0);
    if (!item) {
      // item = new Y.Map();
      item = factory.createItem();
      items.push([item]);
    }
    let text = item.get('text');
    if (!text) {
      text = new Y.Text();
      item.set('text', text);
    }
    text.insert(0, 'AAA', { bold: true });
    text.insert(1, 'BBB', { bold: false });
  }

  public render(): JSX.Element {
    return (
      <>
        <button onClick={this.onClick}>CLICK</button>
        <DebugHelper doc={doc} />
      </>
    );
  }
}

const doc = new Doc();

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Editor />, window.document.querySelector('#root'));
});
