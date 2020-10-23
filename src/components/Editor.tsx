import * as React from 'react';

import { Document } from '../Document';
import { Selection } from '../Selection';
import { DebugHelper } from './DebugHelper';

type EditorProps = {
  doc: Document;
};

type EditorState = {
  doc: ReturnType<Document['toJSON']>;
};

export class Editor extends React.Component<EditorProps, EditorState> {
  constructor(props: EditorProps) {
    super(props);

    this.state = {
      doc: this.props.doc.toJSON(),
    };
  }

  public componentDidMount(): void {
    this.props.doc.on('update', () => {
      this.setState({
        doc: this.props.doc.toJSON(),
      });
    });
  }

  public render(): JSX.Element {
    return (
      <>
        <DebugHelper doc={this.props.doc} />
      </>
    );
  }
}
