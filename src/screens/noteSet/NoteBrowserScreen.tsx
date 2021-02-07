import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NoteSetScreenStackParamList } from './NoteSetScreenStack';

type NoteBrowserScreenProps = StackScreenProps<
  NoteSetScreenStackParamList,
  'NoteBrowser'
>;

export const NoteBrowserScreen: React.FC<NoteBrowserScreenProps> = ({
  navigation,
}) => {
  return <></>;
};
