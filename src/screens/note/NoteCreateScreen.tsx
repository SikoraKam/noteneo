import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NoteScreenStackParamList } from './NoteScreenStack';
import { Editor } from '../../components/editor/Editor';
import { EditorToolbar } from '../../components/editor/EditorToolbar';
import { EditorCaretaker } from '../../components/editor/EditorCaretaker';
import { EditorBehaviour } from '../../types/editor/editor-behaviour';
import { EventBus } from '../../utils/eventBus';
import { NOTE_SAVE_EVENT } from '../../const/events.const';
import { useSaveNoteMutation } from '../../hooks/notes/useSaveNoteMutation';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationParamList } from '../AppScreenStack';

type NoteCreateScreenProps = {
  navigation: CompositeNavigationProp<
    MaterialBottomTabNavigationProp<BottomTabNavigationParamList, 'Note'>,
    StackNavigationProp<NoteScreenStackParamList, 'NoteCreate'>
  >;
  route: RouteProp<NoteScreenStackParamList, 'NoteCreate'>;
};

export const NoteCreateScreen: React.FC<NoteCreateScreenProps> = ({
  navigation,
  route,
}) => {
  const editorRef = useRef<EditorBehaviour | null>(null);
  const editorCaretaker = useRef(new EditorCaretaker()).current;
  const [isEditorReady, setEditorReady] = useState(false);
  const saveNoteMutation = useSaveNoteMutation();

  const saveNoteHandler = useCallback(async () => {
    const snapshot = await editorRef.current?.makeSnapshot();
    if (snapshot) {
      const content = snapshot.getState();
      await saveNoteMutation.mutateAsync({
        title: route.params.title,
        content,
        category: route.params.category,
      });
      navigation.jumpTo('NoteSet', { screen: 'NoteBrowser' });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = EventBus.on(NOTE_SAVE_EVENT, saveNoteHandler);
    return () => {
      unsubscribe();
    };
  }, []);

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
