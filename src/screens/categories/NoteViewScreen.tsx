import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';

import { StyleSheet } from 'react-native';
import { NoteView } from '../../components/note/NoteView';
import { Container } from '../../components/layout/Container';
import { CategoriesScreenStackParamList } from './CategoriesScreenStack';

type NoteViewScreenProps = StackScreenProps<
  CategoriesScreenStackParamList,
  'NoteView'
>;

export const NoteViewScreen: React.FC<NoteViewScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <Container>
      <NoteView noteId={route.params.noteId} />
    </Container>
  );
};

const styles = StyleSheet.create({});
