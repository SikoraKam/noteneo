import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StripeCheckoutSca from '../../../node_modules/expo-stripe-checkout-sca';
import Stripe from 'stripe';

import { WalletScreenStackParamList } from './WalletScreenStack';
import { useAlert } from '../../hooks/useAlert';
import { useUserProfileQuery } from '../../hooks/user/useUserProfileQuery';
import { AppButton } from '../../components/shared/AppButton';

type WalletScreenProps = StackScreenProps<WalletScreenStackParamList, 'Wallet'>;

export const WalletScreen: React.FC<WalletScreenProps> = ({ navigation }) => {
  const userProfile = useUserProfileQuery();

  const [session, setSession] = useState<string>();

  const stripe = new Stripe(
    'pk_test_51HZwBnKmDbuO5ZNDPqTeA7t4cmps0xTN5iuSz8lo0MlY0oyqrahf4CHc4AVrwcwjn6wz6ojzQIfNcnr0rMW0FQiZ00rTFMMKou',
    {
      apiVersion: '2020-08-27',
    }
  );

  const createSession = async () => {
    const session = await stripe.checkout.sessions.create({
      success_url:
        'http://wozniak-dev-api.herokuapp.com/api/subscriptions/success/',
      cancel_url:
        'http://wozniak-dev-api.herokuapp.com/api/subscriptions/failed/',
      payment_method_types: ['card'],
      line_items: [{ price: 'price_H5ggYwtDq4fbrJ', quantity: 1 }],
      mode: 'subscription',
      customer: userProfile.data?.client_id,
    });
    setSession(session.id);
  };

  return (
    <AppButton
      onPress={() => navigation.push('PaymentMethod', { session: session! })}>
      Subskybuj
    </AppButton>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  numberSelectorContainer: {
    alignItems: 'center',
  },
});
