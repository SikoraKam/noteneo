import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { BottomTabNavigationParamList } from '../AppScreenStack';
import { CategoryListScreen } from './CategoryListScreen';

export type CategoriesScreenStackParamList = {
  CategoryList: undefined;
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
    </Stack.Navigator>
  );
};
