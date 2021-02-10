import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { BottomTabNavigationParamList } from '../AppScreenStack';
import { CategoryListScreen } from './CategoryListScreen';
import { NotesFromCategoryScreen } from './NotesFromCategoryScreen';
import { NotesFromCategoryRouteParameters } from '../../types/routeParameters/NotesFromCategoryRouteParameters';
import { NoteViewRouteParams } from '../../types/routeParameters/noteViewRouteParams';
import { NoteViewScreen } from './NoteViewScreen';

export type CategoriesScreenStackParamList = {
  CategoryList: undefined;
  NotesFromCategory: NotesFromCategoryRouteParameters;
  NoteView: NoteViewRouteParams;
};

type CategoriesScreenStackProps = MaterialBottomTabScreenProps<
  BottomTabNavigationParamList,
  'Categories'
>;

const Stack = createStackNavigator<CategoriesScreenStackParamList>();

export const CategoriesScreenStack: React.FC<CategoriesScreenStackProps> = ({
  navigation,
}) => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="CategoryList"
      screenOptions={theme.whiteHeader}>
      <Stack.Screen
        name="CategoryList"
        component={CategoryListScreen}
        options={{ title: 'Kategorie' }}
      />
      <Stack.Screen
        name="NotesFromCategory"
        component={NotesFromCategoryScreen}
        options={{ title: 'Notatki' }}
      />
      <Stack.Screen
        name="NoteView"
        component={NoteViewScreen}
        options={{ title: 'Notatka' }}
      />
    </Stack.Navigator>
  );
};
