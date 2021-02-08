import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import {
  NoteScreenStack,
  NoteScreenStackParamList,
} from './note/NoteScreenStack';
import {
  NoteSetScreenStack,
  NoteSetScreenStackParamList,
} from './noteSet/NoteSetScreenStack';
import {
  ProfileScreenStack,
  ProfileScreenStackParamList,
} from './profile/ProfileScreenStack';
import { AuthScreenStackParamList } from './auth/AuthScreenStack';
import { WalletScreenStack } from './wallet/WalletScreenStack';
import {
  CategoriesScreenStack,
  CategoriesScreenStackParamList,
} from './categories/CategoriesScreenStack';

export type BottomTabNavigationParamList = {
  Auth: NavigatorScreenParams<AuthScreenStackParamList>;
  Note: NavigatorScreenParams<NoteScreenStackParamList>;
  NoteSet: NavigatorScreenParams<NoteSetScreenStackParamList>;
  Profile: NavigatorScreenParams<ProfileScreenStackParamList>;
  Wallet: undefined;
  Categories: NavigatorScreenParams<CategoriesScreenStackParamList>;
};
const Tab = createMaterialBottomTabNavigator<BottomTabNavigationParamList>();

const ROUTE_TO_ICON_MAP: Record<keyof BottomTabNavigationParamList, string> = {
  Auth: 'account',
  Note: 'note-text',
  NoteSet: 'notebook-multiple',
  Profile: 'account',
  Wallet: 'wallet',
  Categories: 'view-list',
};

export const AppScreenStack: React.FC = () => {
  // Preload user profile
  // useUserProfileQuery();
  const theme = useTheme();

  return (
    <Tab.Navigator
      activeColor="#FFF"
      initialRouteName="Note"
      inactiveColor="rgba(255, 255, 255, 0.6)"
      labeled
      barStyle={{ backgroundColor: theme.colors.primary }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const iconName = ROUTE_TO_ICON_MAP[route.name];
          return (
            <MaterialCommunityIcons
              name={iconName as any}
              color={color}
              size={26}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Note"
        component={NoteScreenStack}
        options={{ tabBarLabel: 'Nowa' }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreenStack}
        options={{ tabBarLabel: 'Kategorie' }}
      />
      <Tab.Screen
        name="NoteSet"
        component={NoteSetScreenStack}
        options={{ tabBarLabel: 'Notatki' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreenStack}
        options={{ tabBarLabel: 'Profil' }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreenStack}
        options={{ tabBarLabel: 'Portfel' }}
      />
    </Tab.Navigator>
  );
};
