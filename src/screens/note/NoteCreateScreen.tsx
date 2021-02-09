import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { NoteScreenStackParamList } from './NoteScreenStack';
import { Editor } from '../../components/editor/Editor';
import { EditorToolbar } from '../../components/editor/EditorToolbar';
import { EditorCaretaker } from '../../components/editor/EditorCaretaker';
import { EditorBehaviour } from '../../types/editor/editor-behaviour';

type NoteCreateScreenProps = StackScreenProps<
  NoteScreenStackParamList,
  'NoteCreate'
>;

export const NoteCreateScreen: React.FC<NoteCreateScreenProps> = ({
  navigation,
}) => {
  const editorRef = useRef<EditorBehaviour | null>(null);
  const editorCaretaker = useRef(new EditorCaretaker()).current;
  const [isEditorReady, setEditorReady] = useState(false);

  const onEditorChange = async () => {
    if (editorRef.current) {
      const snapshot = await editorRef.current.makeSnapshot();
      if (snapshot) {
        editorCaretaker.registerSnapshot(snapshot);
      }
    }
  };

  const onUndo = async () => {
    const snapshot = editorCaretaker.getUndoSnapshot();

    if (editorRef.current && snapshot) {
      editorRef.current.restoreSnapshot(snapshot);
    }
  };

  const onRedo = async () => {
    const snapshot = editorCaretaker.getRedoSnapshot();

    if (editorRef.current && snapshot) {
      editorRef.current.restoreSnapshot(snapshot);
    }
  };

  useEffect(() => {
    if (editorRef.current?.isReady?.()) {
      setEditorReady(true);
    }
  }, [editorRef.current]);

  return (
    <>
      <Editor ref={editorRef} onChange={onEditorChange} />
      {isEditorReady && (
        <EditorToolbar
          editorRef={editorRef.current!}
          onUndo={onUndo}
          onRedo={onRedo}
        />
      )}
    </>
  );
};
