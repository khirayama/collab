import * as Y from 'yjs';
import * as React from 'react';
import styled from 'styled-components';

/* ActionController */
const ActionControllerWrapper = styled.div``;

function ActionController() {
  return (
    <ActionControllerWrapper>
      <h2>Action Controller</h2>
      <ul>
        <li>
          <button onClick={() => console.log('ADD ITEM')}>ADD ITEM</button>
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

function TreeViewer(props: { doc: Y.Doc }) {
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

export function DebugHelper(props: { doc: Y.Doc }) {
  const doc = props.doc;

  return (
    <DebugHelperWrapper>
      <ActionController doc={doc} />
      <TreeViewer doc={doc} />
    </DebugHelperWrapper>
  );
}
