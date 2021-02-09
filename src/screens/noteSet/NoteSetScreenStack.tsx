import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { BottomTabNavigationParamList } from '../AppScreenStack';
import { NoteBrowserScreen } from './NoteBrowserScreen';
import { NoteViewRouteParams } from '../../types/routeParameters/noteViewRouteParams';
import { NoteViewScreen } from './NoteViewScreen';

export type NoteSetScreenStackParamList = {
  NoteBrowser: undefined;
  NoteView: NoteViewRouteParams;
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
      screenOptions={theme.whiteHeader}>
      <Stack.Screen
        name="NoteBrowser"
        component={NoteBrowserScreen}
        options={{ title: 'Noteneo' }}
      />
      <Stack.Screen
        name="NoteView"
        component={NoteViewScreen}
        options={{ title: 'Notatka' }}
      />
    </Stack.Navigator>
  );
};
