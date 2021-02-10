import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { BottomTabNavigationParamList } from '../AppScreenStack';
import { WalletScreen } from './WalletScreen';
import { PaymentMethodRouteParams } from '../../types/routeParameters/PaymentMethodRouteParams';

export type WalletScreenStackParamList = {
  Wallet: undefined;
  PaymentMethod: PaymentMethodRouteParams;
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
        })}
      />
    </Stack.Navigator>
  );
};
