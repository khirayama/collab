import * as Y from 'yjs';

import { Doc } from './Doc';

export class Selection {
  private doc: Doc;

  public data: {
    compositionText: string;
    range: {
      anchor: {
        id: string;
        offset: Y.RelativePosition;
      };
      focus: {
        id: string;
        offset: Y.RelativePosition;
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
    return {
      compositionText: this.data.compositionText,
      range:
        this.data.range === null
          ? null
          : {
              anchor: {
                id: this.data.range.anchor.id,
                offset: this.data.range.anchor.offset /* index */,
              },
              focus: {
                id: this.data.range.focus.id,
                offset: this.data.range.focus.offset /* index */,
              },
            },
    };
  }

  /* tmp */
  public _focus() {
    const item = this.doc._first();
    const text: Y.Text = item.get('text') as any;
    if (item && text) {
      const itemDataContent = item.toJSON();
      this.data.range = {
        anchor: {
          id: itemDataContent.id,
          offset: Y.createRelativePositionFromTypeIndex(text, 1),
        },
        focus: {
          id: itemDataContent.id,
          offset: Y.createRelativePositionFromTypeIndex(text, 1),
        },
      };
    }
  }
}
