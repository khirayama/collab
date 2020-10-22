import * as uuid from 'uuid';

export class User {
  public id: string = uuid.v4();

  constructor() {
    const id = window.localStorage.getItem('doc_user_id');
    if (id) {
      this.id = id;
    } else {
      window.localStorage.setItem('doc_user_id', this.id);
    }
  }
}
