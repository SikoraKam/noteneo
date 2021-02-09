import * as React from 'react';
import { useNoteByIdQuery } from '../../hooks/notes/noteByIdQuery';
import WebView from 'react-native-webview';

interface NoteViewProps {
  noteId: number;
}

export const NoteView: React.FC<NoteViewProps> = (props) => {
  const note = useNoteByIdQuery(props.noteId);

  return note.data?.content !== undefined ? (
    <WebView source={{ html: note.data?.content }} />
  ) : null;
};
