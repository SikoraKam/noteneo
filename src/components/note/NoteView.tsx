import * as React from 'react';
import { useNoteByIdQuery } from '../../hooks/notes/noteByIdQuery';
import WebView from 'react-native-webview';

interface NoteViewProps {
  noteId: number;
}

export const NoteView: React.FC<NoteViewProps> = (props) => {
  const note = useNoteByIdQuery(props.noteId);

  return note.data?.content !== undefined ? (
    <WebView
      source={{
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<h1 style="text-align: center">${note.data.title}</h1>
  ${note.data.content}
</body>
</html>`,
      }}
    />
  ) : null;
};
