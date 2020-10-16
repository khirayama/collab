import * as Y from 'yjs';
import { factory } from './factory';
import { WebsocketProvider } from 'y-websocket';

export class Doc {
  private doc: Y.Doc;

  constructor() {
    this.doc = factory.createDoc();

    const wsProvider = new WebsocketProvider('ws://localhost:5001', 'my-roomname', this.doc);
    wsProvider.on('status', (event: any) => {
      console.log(event.status);
    });
  }

  public on(event: string, callback: Function) {
    this.doc.on(event, callback);
  }

  public toJSON() {
    return this.doc.toJSON();
  }
}
