import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Doc } from './Doc';
import { Selection } from './Selection';
import { DebugHelper } from './components/DebugHelper';

type EditorProps = {
  doc: Doc;
  selection: Selection;
};

type EditorState = {
  doc: ReturnType<Doc['toJSON']>;
  selection: ReturnType<Selection['toJSON']>;
};

class Editor extends React.Component<EditorProps, EditorState> {
  constructor(props: EditorProps) {
    super(props);

    this.state = {
      doc: this.props.doc.toJSON(),
      selection: this.props.selection.toJSON(),
    };
  }

  public componentDidMount(): void {
    doc.on('update', () => {
      this.setState({
        doc: this.props.doc.toJSON(),
        selection: this.props.selection.toJSON(),
      });
    });
  }

  public render(): JSX.Element {
    return (
      <>
        <DebugHelper doc={this.props.doc} selection={this.props.selection} />
      </>
    );
  }
}

const doc = new Doc();
const selection = new Selection(doc);
selection._focus();

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Editor doc={doc} selection={selection} />, window.document.querySelector('#root'));
});
