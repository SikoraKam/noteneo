import { Memento } from './Memento';

export class EditorSnapshot implements Memento {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  public getState() {
    return this.text;
  }
}
