import { RichEditor } from 'react-native-pell-rich-editor';
import React, { useCallback, useImperativeHandle, useRef } from 'react';
import { EditorSnapshot } from './EditorSnapshot';
import { EditorBehaviour } from '../../types/editor/editor-behaviour';

interface EditorProps {
  onChange(): void;
}

/**
 * Editor is the Memento originator
 * The Originator can produce snapshots of its own state,
 * as well as restore its state from snapshots when needed.
 */
export const Editor = React.forwardRef<EditorBehaviour, EditorProps>(
  ({ onChange }, ref) => {
    const editorRef = useRef<RichEditor | null>(null);

    /**
     * Creates a snapshot of the editor’s state
     */
    const makeSnapshot = useCallback(async () => {
      if (editorRef.current) {
        const content = await editorRef.current.getContentHtml();
        return new EditorSnapshot(content);
      }
    }, []);

    /**
     * Restores a snapshot of the editor's state
     */
    const restoreSnapshot = useCallback(async (snapshot: EditorSnapshot) => {
      if (editorRef.current) {
        editorRef.current.setContentHTML(snapshot.getState());
        editorRef.current.focusContentEditor();
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        isReady: () => editorRef.current !== null,
        getEditorRef: () => editorRef,
        makeSnapshot,
        restoreSnapshot,
      }),
      [makeSnapshot, restoreSnapshot]
    );

    return (
      <RichEditor
        ref={editorRef}
        placeholder="Rozpocznij swoją notatkę..."
        style={{ flex: 1 }}
        onChange={onChange}
      />
    );
  }
);
