import { EditorSnapshot } from './EditorSnapshot';

export class EditorCaretaker {
  private undoHistory: EditorSnapshot[] = [];
  private redoHistory: EditorSnapshot[] = [];

  public registerSnapshot(snapshot: EditorSnapshot) {
    this.undoHistory.push(snapshot);
    this.redoHistory = [];
  }

  public getUndoSnapshot() {
    if (!this.undoHistory.length) {
      return null;
    }

    const snapshot = this.undoHistory.pop();
    this.redoHistory.push(snapshot!);
    return snapshot;
  }

  public getRedoSnapshot() {
    if (!this.redoHistory.length) {
      return null;
    }

    const snapshot = this.redoHistory.pop();
    this.undoHistory.push(snapshot!);
    return snapshot;
  }
}
