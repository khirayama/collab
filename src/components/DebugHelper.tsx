import * as React from 'react';
import styled from 'styled-components';

import { Document } from '../Document';
import { action } from '../action';

/* ActionController */
const ActionControllerWrapper = styled.div`
  & {
    flex: 1;
  }
`;

function ActionController(props: { doc: Document }) {
  const doc = props.doc;

  const onAddItemButtonClick = () => {
    action.addItem(doc);
  };

  return (
    <ActionControllerWrapper>
      <h2>Actions</h2>
      <ul>
        <li>
          <button onClick={onAddItemButtonClick}>ADD ITEM</button>
        </li>
      </ul>
    </ActionControllerWrapper>
  );
}

/* TreeViewer */
const TreeViewerWrapper = styled.div`
  & {
    flex: 1;
  }

  div {
    white-space: pre-wrap;
  }
`;

function TreeViewer(props: { doc: Document }) {
  const doc = props.doc;

  return (
    <TreeViewerWrapper>
      <h2>Tree Viewer</h2>
      <div>{JSON.stringify(doc.toJSON(), null, 2)}</div>
    </TreeViewerWrapper>
  );
}

/* SelectionViewer */
const SelectionViewerWrapper = styled.div`
  & {
    flex: 1;
  }

  div {
    white-space: pre-wrap;
  }
`;

function SelectionViewer(props: { doc: Document }) {
  const selection = props.doc.getSelection();

  return (
    <SelectionViewerWrapper>
      <h2>Selection Viewer</h2>
      <div>{JSON.stringify(selection.toJSON(), null, 2)}</div>
    </SelectionViewerWrapper>
  );
}

/* DebugHelper */
const DebugHelperWrapper = styled.div`
  & {
    display: flex;
    position: fixed;
    right: 0;
    top: 0;
    padding: 12px;
    background: rgba(0, 0, 0, 0.45);
    color: #fff;
    max-width: calc(100% * 2 / 3);
    height: 100%;
    word-wrap: break-word;
    overflow: scroll;
  }
`;

export function DebugHelper(props: { doc: Doc; selection: Selection }) {
  const doc = props.doc;
  const selection = props.selection;

  return (
    <DebugHelperWrapper>
      <ActionController doc={doc} selection={selection} />
      <SelectionViewer doc={doc} selection={selection} />
      <TreeViewer doc={doc} selection={selection} />
    </DebugHelperWrapper>
  );
}
