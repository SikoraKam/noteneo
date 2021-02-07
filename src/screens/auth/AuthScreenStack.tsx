import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { HeaderAppButton } from '../../components/shared/HeaderAppButton';
import { LoginScreen } from './LoginScreen';
import { PasswordResetConfirmScreen } from './PasswordResetConfirmScreen';
import { PasswordResetScreen } from './PasswordResetScreen';
import { RegisterScreen } from './RegisterScreen';

export type AuthScreenStackParamList = {
  Login: undefined;
  Register: undefined;
  PasswordReset: undefined;
  PasswordResetConfirm: undefined;
};

const Stack = createStackNavigator<AuthScreenStackParamList>();

export const AuthScreenStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { elevation: 0 },
        headerRightContainerStyle: { paddingRight: 16 },
      }}>
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={({ navigation }) => ({
          title: 'Rejestracja',
          headerRight: () => (
            <HeaderAppButton
              inverse
              onPress={() => navigation.navigate('Login')}>
              Zaloguj
            </HeaderAppButton>
          ),
        })}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Logowanie' }}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={{
          title: 'Reset hasła',
        }}
      />
      <Stack.Screen
        name="PasswordResetConfirm"
        component={PasswordResetConfirmScreen}
      />
    </Stack.Navigator>
  );
};
