import { Doc } from './Doc';

export class Selection {
  private doc: Doc;

  public data: {
    compositionText: string;
    range: {
      anchor: {
        id: string;
        offset: number;
      };
      focus: {
        id: string;
        offset: number;
      };
    } | null;
  } = {
    compositionText: '',
    range: null,
  };

  constructor(doc: Doc) {
    this.doc = doc;
  }

  public toJSON() {
    return this.data;
  }

  /* tmp */
  public _focus() {
    const item = this.doc._first();
    console.log(item);
  }
}
