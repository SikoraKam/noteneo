import { MutableRefObject } from 'react';
import { RichEditor } from 'react-native-pell-rich-editor';
import { Memento } from '../../components/editor/Memento';
import { EditorSnapshot } from '../../components/editor/EditorSnapshot';

export interface EditorBehaviour {
  isReady(): boolean;
  getEditorRef(): MutableRefObject<RichEditor | null>;
  makeSnapshot(): Promise<EditorSnapshot | undefined>;
  restoreSnapshot(snapshot: Memento): void;
}
