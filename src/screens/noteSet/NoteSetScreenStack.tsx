import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { BottomTabNavigationParamList } from '../AppScreenStack';
import { NoteBrowserScreen } from './NoteBrowserScreen';

export type NoteSetScreenStackParamList = {
  NoteBrowser: undefined;
};

type NoteSetScreenStackProps = MaterialBottomTabScreenProps<
  BottomTabNavigationParamList,
  'NoteSet'
>;

const Stack = createStackNavigator<NoteSetScreenStackParamList>();

export const NoteSetScreenStack: React.FC<NoteSetScreenStackProps> = ({
  navigation,
}) => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="NoteBrowser"
      screenOptions={theme.primaryHeader}>
      <Stack.Screen
        name="NoteBrowser"
        component={NoteBrowserScreen}
        options={{ title: 'Utwórz notatke' }}
      />
    </Stack.Navigator>
  );
};
