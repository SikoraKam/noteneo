import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button, useTheme } from 'react-native-paper';
import { BottomTabNavigationParamList } from '../AppScreenStack';

import { NoteCreateScreen } from './NoteCreateScreen';
import { HeaderAppButton } from '../../components/shared/HeaderAppButton';
import { NoteSettingsScreen } from './NoteSettingsScreen';
import { NoteCreateRouteParams } from '../../types/routeParameters/NoteCreateRouteParams';
import { EventBus } from '../../utils/eventBus';
import { NOTE_SAVE_EVENT } from '../../const/events.const';

export type NoteScreenStackParamList = {
  NoteSettings: undefined;
  NoteCreate: NoteCreateRouteParams;
};

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
      initialRouteName="NoteSettings"
      screenOptions={{
        ...theme.primaryHeader,
      }}>
      <Stack.Screen
        name="NoteSettings"
        component={NoteSettingsScreen}
        options={{ title: 'Utwórz notatke' }}
      />
      <Stack.Screen
        name="NoteCreate"
        component={NoteCreateScreen}
        options={{
          title: 'Utwórz notatke',
          headerRight: () => (
            <HeaderAppButton onPress={() => EventBus.emit(NOTE_SAVE_EVENT)}>
              Zapisz
            </HeaderAppButton>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
