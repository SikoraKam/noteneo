import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { BottomTabNavigationParamList } from '../AppScreenStack';

import { NoteCreateScreen } from './NoteCreateScreen';

export type NoteScreenStackParamList = { NoteCreate: undefined };

type NoteScreenStackProps = MaterialBottomTabScreenProps<
  BottomTabNavigationParamList,
  'Note'
>;

const Stack = createStackNavigator<NoteScreenStackParamList>();

export const NoteScreenStack: React.FC<NoteScreenStackProps> = ({
  navigation,
}) => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="NoteCreate"
      screenOptions={theme.primaryHeader}>
      <Stack.Screen
        name="NoteCreate"
        component={NoteCreateScreen}
        options={{ title: 'Utwórz notatke' }}
      />
    </Stack.Navigator>
  );
};
