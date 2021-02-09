import { actions, RichToolbar } from 'react-native-pell-rich-editor';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { EditorBehaviour } from '../../types/editor/editor-behaviour';

type EditorToolbarProps = React.ComponentProps<typeof RichToolbar> & {
  editorRef: EditorBehaviour;
  onUndo(): void;
  onRedo(): void;
};

export const EditorToolbar: React.FC<EditorToolbarProps> = (props) => {
  const theme = useTheme();

  return (
    <RichToolbar
      {...props}
      selectedIconTint={theme.colors.primary}
      actions={[
        actions.setBold,
        actions.setItalic,
        actions.insertBulletsList,
        actions.insertOrderedList,
        actions.setStrikethrough,
        actions.setUnderline,
        actions.insertLink,
        actions.removeFormat,
        actions.undo,
        actions.redo,
      ]}
      iconMap={{
        customUndo: require('../../../assets/editor/undo.png'),
        customRedo: require('../../../assets/editor/redo.png'),
      }}
      // @ts-ignore
      customUndo={props.onUndo}
      customRedo={props.onRedo}
      getEditor={() => props.editorRef.getEditorRef().current!}
    />
  );
};
