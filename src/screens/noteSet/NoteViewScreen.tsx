import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { NoteSetScreenStackParamList } from './NoteSetScreenStack';
import { StyleSheet } from 'react-native';
import { NoteView } from '../../components/note/NoteView';
import { Container } from '../../components/layout/Container';

type NoteViewScreenProps = StackScreenProps<
  NoteSetScreenStackParamList,
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
