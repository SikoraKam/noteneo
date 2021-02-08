import React from 'react';
import { WebView } from 'react-native-webview';
import { STRIPE } from './stripeSettings';
import { stripeCheckoutRedirectHTML } from './stripeCheckout';
import { useUserProfileQuery } from '../../hooks/user/useUserProfileQuery';
import { useAlert } from '../../hooks/useAlert';
import { StackScreenProps } from '@react-navigation/stack';
import { WalletScreenStackParamList } from './WalletScreenStack';

type WalletPaymentMethodScreenProps = StackScreenProps<
  WalletScreenStackParamList,
  'PaymentMethod'
>;

const PurchaseProduct = () => {
  const userProfile = useUserProfileQuery();
  const { showAlert } = useAlert();

  // TODO: this should come from some service/state store
  const user = { id: userProfile.data?.pk };

  const onSuccessHandler = () => {
    showAlert('Sukces', 'Operacja powiodła się');
  };
  const onCanceledHandler = () => {
    showAlert('Anulowano', 'Operacja anulowana');
  };

  // Called everytime the URL stats to load in the webview
  const onLoadStart = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.url === STRIPE.SUCCESS_URL) {
      onSuccessHandler();
      return;
    }
    if (nativeEvent.url === STRIPE.CANCELED_URL) {
      onCanceledHandler();
    }
  };

  // Render
  if (!user) {
    return null;
  }

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: stripeCheckoutRedirectHTML(user.id) }}
      onLoadStart={onLoadStart}
    />
  );
};

export default PurchaseProduct;
