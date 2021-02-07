import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { Text } from 'react-native';

import { BottomTabNavigationParamList } from '../AppScreenStack';
import { ProfileScreen } from './ProfileScreen';
import { HeaderAppButton } from '../../components/shared/HeaderAppButton';
import { ProfileEditRouteParameters } from '../../types/ProfileEditRouteParameters';
import { ProfileEditScreen } from './ProfileEditScreen';

export type ProfileScreenStackParamList = {
  Profile: undefined;
  ProfileEdit: ProfileEditRouteParameters;
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
  // const { logout } = useAuth();

  const onLogout = async () => {
    // await logout();
    console.log('WYLOGUJ');
  };

  return (
    <Stack.Navigator screenOptions={theme.tallHeader}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: 'Profil',
          headerLeft: () => (
            <HeaderAppButton
              onPress={() =>
                navigation.push('ProfileEdit', {
                  // avatar: userProfile.data?.versioned_avatar,
                  avatar: require('../../../assets/versioned_initial_avatar.png'), //TODO
                })
              }>
              Edytuj
            </HeaderAppButton>
          ),
          headerRight: () => (
            <HeaderAppButton onPress={onLogout}>Wyloguj</HeaderAppButton>
          ),
        })}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={{ title: 'Edytuj profil' }}
      />
    </Stack.Navigator>
  );
};
