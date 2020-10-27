import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Document } from './Document';
import { User } from './User';
import { Editor } from './components/Editor';

const user = new User();
const doc = new Document(user);

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Editor doc={doc} />, window.document.querySelector('#root'));
});
