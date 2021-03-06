import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { WalletScreenStackParamList } from './WalletScreenStack';
import { useUserProfileQuery } from '../../hooks/user/useUserProfileQuery';
import { AppButton } from '../../components/shared/AppButton';
import { useUserCheckoutSessionQuery } from '../../hooks/subscription/useUserCheckoutSessionQuery';
import { useQueryClient } from 'react-query';
import { QUERY_USER_PROFILE_KEY } from '../../const/query.const';
import { StripeCheckout } from '../../components/stripe/StripeCheckout';
import { Button, Paragraph, Title } from 'react-native-paper';
import { useCancelSubscriptionMutation } from '../../hooks/subscription/useCancelSubscriptionMutation';

type WalletScreenProps = StackScreenProps<WalletScreenStackParamList, 'Wallet'>;

export const WalletScreen: React.FC<WalletScreenProps> = ({ navigation }) => {
  const [isOpen, setOpen] = useState(false);
  const userProfile = useUserProfileQuery();
  const sessionId = useUserCheckoutSessionQuery();
  const queryClient = useQueryClient();
  const [isPending, setPending] = useState(false);
  const { mutateAsync } = useCancelSubscriptionMutation();

  const onClose = () => {
    queryClient.invalidateQueries(QUERY_USER_PROFILE_KEY);
    setOpen(false);
  };

  const initCheckout = async () => {
    if (!sessionId.data) {
      alert('Podczas generowania sesji wystąpił błąd');
    } else {
      setOpen(true);
    }
  };

  const cancelSubscription = async () => {
    setPending(true);

    try {
      await mutateAsync();
      alert(
        'Subskrybcja została anulowana. Twoje konto premium wygaśnie po zakończeniu aktualnego okresu rozliczeniowego.'
      );
    } catch (error) {
      alert('Podczas anulowania subskrybcji wystąpił błąd!');
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      {userProfile?.data?.is_subscriber &&
      !userProfile.data?.is_subscription_cancelled ? (
        <View style={styles.info}>
          <Title style={styles.textCenter}>Noteneo Premium</Title>
          <Paragraph style={[styles.textCenter, { marginBottom: 16 }]}>
            Całunie rączki Mości Panie! Z radością potwierdzam, że jesteś
            posiadaczem jedynego w swoim rodzaju konta premium na serwisie
            Noteneo!
          </Paragraph>
          <Button
            uppercase={false}
            labelStyle={{ letterSpacing: 0 }}
            mode="contained"
            accessibilityTraits=""
            accessibilityComponentType=""
            disabled={isPending}
            loading={isPending}
            onPress={cancelSubscription}>
            Anuluj subskrybcję
          </Button>
        </View>
      ) : (
        <View style={styles.info}>
          <Title style={styles.textCenter}>Noteneo Premium</Title>
          <Paragraph style={[styles.textCenter, { marginBottom: 16 }]}>
            Wygląda na to, że nie jesteś jeszcze posiadaczem niesamowitego konta
            premium... Najwyższa pora to zmienić!
          </Paragraph>
          <Button
            uppercase={false}
            labelStyle={{ letterSpacing: 0 }}
            mode="contained"
            accessibilityTraits=""
            accessibilityComponentType=""
            onPress={initCheckout}>
            Wykup subskrybcje
          </Button>
        </View>
      )}

      <StripeCheckout
        modalVisible={isOpen}
        onClose={onClose}
        publicKey="pk_test_51HZwBnKmDbuO5ZNDPqTeA7t4cmps0xTN5iuSz8lo0MlY0oyqrahf4CHc4AVrwcwjn6wz6ojzQIfNcnr0rMW0FQiZ00rTFMMKou"
        sessionId={sessionId.data ?? ''}
      />
    </>
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
  textCenter: {
    textAlign: 'center',
    letterSpacing: 0,
  },
  info: {
    padding: 16,
  },
});
