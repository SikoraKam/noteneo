import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { Text } from 'react-native';

import { BottomTabNavigationParamList } from '../AppScreenStack';
import { ProfileScreen } from './ProfileScreen';

export type ProfileScreenStackParamList = {
  Profile: undefined;
};

type ProfileScreenStackProps = MaterialBottomTabScreenProps<
  BottomTabNavigationParamList,
  'Profile'
>;

const Stack = createStackNavigator<ProfileScreenStackParamList>();

export const ProfileScreenStack: React.FC<ProfileScreenStackProps> = ({
  navigation,
}) => {
  const theme = useTheme();

  return (
    <Stack.Navigator screenOptions={theme.tallHeader}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: 'Profil',
          headerLeft: () => <Text>Edytuj</Text>,
        })}
      />
    </Stack.Navigator>
  );
};
