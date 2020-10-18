import * as React from 'react';
import styled from 'styled-components';

import { Doc } from '../Doc';
import { Selection } from '../Selection';
import { action } from '../action';

/* ActionController */
const ActionControllerWrapper = styled.div``;

function ActionController(props: { doc: Doc; selection: Selection }) {
  const doc = props.doc;
  const selection = props.selection;

  const onAddItemButtonClick = () => {
    action.addItem(doc, selection);
  };

  return (
    <ActionControllerWrapper>
      <h2>Action Controller</h2>
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
  div {
    white-space: pre-wrap;
  }
`;

function TreeViewer(props: { doc: Doc; selection: Selection }) {
  const doc = props.doc;

  return (
    <TreeViewerWrapper>
      <h2>Tree Viewer</h2>
      <div>{JSON.stringify(doc.toJSON(), null, 2)}</div>
    </TreeViewerWrapper>
  );
}

/* DebugHelper */
const DebugHelperWrapper = styled.div`
  & {
    position: fixed;
    right: 0;
    top: 0;
    padding: 24px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    max-width: calc(100% / 3);
    height: 100%;
    word-wrap: break-word;
  }
`;

export function DebugHelper(props: { doc: Doc; selection: Selection }) {
  const doc = props.doc;
  const selection = props.selection;

  return (
    <DebugHelperWrapper>
      <ActionController doc={doc} selection={selection} />
      <TreeViewer doc={doc} selection={selection} />
    </DebugHelperWrapper>
  );
}
