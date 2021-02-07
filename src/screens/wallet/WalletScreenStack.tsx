import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { HeaderAppButton } from '../../components/shared/HeaderAppButton';
import { BottomTabNavigationParamList } from '../AppScreenStack';
import { WalletPaymentMethodScreen } from './WalletPaymentMethodScreen';
import { WalletScreen } from './WalletScreen';

export type WalletScreenStackParamList = {
  Wallet: undefined;
  PaymentMethod: undefined;
};

const Stack = createStackNavigator<WalletScreenStackParamList>();

type WalletScreenStackProps = MaterialBottomTabScreenProps<
  BottomTabNavigationParamList,
  'Wallet'
>;

export const WalletScreenStack: React.FC<WalletScreenStackProps> = ({
  navigation,
}) => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={theme.whiteHeader}
      initialRouteName="Wallet">
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={({ navigation }) => ({
          title: 'Portfel',
          headerRight: () => (
            <HeaderAppButton
              inverse
              onPress={() => navigation.navigate('PaymentMethod')}>
              Karta
            </HeaderAppButton>
          ),
        })}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={WalletPaymentMethodScreen}
        options={{
          title: 'Metoda płatności',
        }}
      />
    </Stack.Navigator>
  );
};
