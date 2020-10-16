import * as Y from 'yjs';

export class Usecase {
  private doc: Y.Doc;

  constructor(doc: Y.Doc) {
    this.doc = doc;
  }

  public addItem(): void {}
}
