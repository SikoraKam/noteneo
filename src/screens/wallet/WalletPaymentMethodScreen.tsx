import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WalletScreenStackParamList } from './WalletScreenStack';
import StripeCheckoutSca from 'expo-stripe-checkout-sca';
import { useAlert } from '../../hooks/useAlert';

type WalletPaymentMethodScreenProps = StackScreenProps<
  WalletScreenStackParamList,
  'PaymentMethod'
>;

export const WalletPaymentMethodScreen: React.FC<WalletPaymentMethodScreenProps> = ({
  navigation,
  route,
}) => {
  const { showAlert } = useAlert();

  const log = (e: any) => {
    const url: string = e.url;
    // Do your stuff
    // Check url. It may be the success or cancel url
    // Here you can set modal as no more visible
  };

  const onClose = () => {
    showAlert('Anulowano', 'Anulowano platnosc');
  };

  return (
    <StripeCheckoutSca
      modalVisible
      onClose={onClose}
      onNavigationStateChange={(e) => log(e)}
      publicKey="pk_test_51HZwBnKmDbuO5ZNDPqTeA7t4cmps0xTN5iuSz8lo0MlY0oyqrahf4CHc4AVrwcwjn6wz6ojzQIfNcnr0rMW0FQiZ00rTFMMKou"
      sessionId={route.params.session}
    />
  );
};

const styles = StyleSheet.create({
  info: {
    textAlign: 'center',
    paddingVertical: 16,
  },
  cardContainer: {
    paddingVertical: 64,
  },
});
