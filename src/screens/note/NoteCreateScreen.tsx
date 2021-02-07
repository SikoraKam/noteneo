import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NoteScreenStackParamList } from './NoteScreenStack';

type NoteCreateScreenProps = StackScreenProps<
  NoteScreenStackParamList,
  'NoteCreate'
>;

export const NoteCreateScreen: React.FC<NoteCreateScreenProps> = ({
  navigation,
}) => {
  return <></>;
};
