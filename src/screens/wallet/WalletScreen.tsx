import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
// import BottomSheet from 'reanimated-bottom-sheet';
//
// import { Container } from '../../components/layout/Container';
// import { AppButton } from '../../components/shared/AppButton';
// import { AppText } from '../../components/shared/AppText';
// import {
//   NumberSelector,
//   NumberSelectorBehaviour
// } from '../../components/shared/NumberSelector';
// import RoundInformation from '../../components/shared/RoundInformation';
// import { Modal } from '../../components/shared/modal/Modal';
// import { WalletTransactionHistoryList } from '../../components/wallet/WalletTransactionHistoryList';
// import { useChargeWalletMutation } from '../../hooks/payments/useChargeWalletMutation';
// import { useUserHasActivePaymentMethodQuery } from '../../hooks/payments/useUserHasActivePaymentMethodQuery';
// import { useUserWalletQuery } from '../../hooks/payments/useUserWalletQuery';
// import { ListPlaceholder } from '../../utils/ListPlaceholder';
import { WalletScreenStackParamList } from './WalletScreenStack';
import { AppButton } from '../../components/shared/AppButton';

type WalletScreenProps = StackScreenProps<WalletScreenStackParamList, 'Wallet'>;

const INITIAL_TOP_UP_AMOUNT = 1.0;

export const WalletScreen: React.FC<WalletScreenProps> = ({ navigation }) => {
  // const wallet = useUserWalletQuery();
  // const modalRef = useRef<BottomSheet | null>(null);
  // const amountSelectorRef = useRef<NumberSelectorBehaviour | null>(null);
  // const [topUpAmount, setTopUpAmount] = useState(INITIAL_TOP_UP_AMOUNT);
  // const topUp = useChargeWalletMutation();
  // const [isPending, setPending] = useState(false);
  // const hasActivePaymentMethod = useUserHasActivePaymentMethodQuery().data;
  //
  // const resetTopUpAmount = () => {
  //   setTopUpAmount(INITIAL_TOP_UP_AMOUNT);
  //   amountSelectorRef.current?.reset();
  // };
  //
  // const onTopUpPress = () => {
  //   if (!hasActivePaymentMethod) {
  //     navigation.navigate('PaymentMethod');
  //     return;
  //   }
  //   modalRef?.current?.snapTo(0);
  // };
  //
  // const onTopUpConfirm = async () => {
  //   setPending(true);
  //
  //   try {
  //     await topUp.mutateAsync(topUpAmount);
  //     modalRef.current?.snapTo(1);
  //   } catch (error) {
  //     alert(
  //       'Podczas doładowywania portfela wystąpił błąd. Spróbuj ponownie lub skontaktuj się z supportem'
  //     );
  //   } finally {
  //     setPending(false);
  //     resetTopUpAmount();
  //   }
  // };
  //
  // const balance = wallet.data ? wallet.data.balance.toFixed(2) : '...';
  // const transactions = useMemo(() => {
  //   if (wallet.isFetching || wallet.isError) {
  //     return [];
  //   }
  //   const filteredCharges = wallet.data!.charges.filter(
  //     (charge) => parseFloat(charge.amount) > 0
  //   );
  //   return [...filteredCharges].sort(
  //     (a, b) =>
  //       new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  //   );
  // }, [wallet.isFetching, wallet.isError, wallet.data]);
  //
  // return (
  //   <Container>
  //     <View style={styles.balanceContainer}>
  //       <RoundInformation
  //         mainText={balance}
  //         subText="Aktualny stan konta"
  //         buttonText="Doładuj"
  //         onButtonPress={onTopUpPress}
  //         isLoading={wallet.isFetching}
  //       />
  //     </View>
  //     <AppText variant="h1" style={styles.header}>
  //       Historia
  //     </AppText>
  //     {wallet.data ? (
  //       <WalletTransactionHistoryList transactions={transactions} />
  //     ) : (
  //       <ListPlaceholder placeholderCount={5} />
  //     )}
  //     <Modal
  //       ref={modalRef}
  //       dismissible={!isPending}
  //       title="Wybierz kwotę doładowania">
  //       <View style={styles.numberSelectorContainer}>
  //         <NumberSelector
  //           ref={amountSelectorRef}
  //           min={1.0}
  //           step={0.5}
  //           initialValue={INITIAL_TOP_UP_AMOUNT}
  //           numberFormatter={(value) => value.toFixed(2)}
  //           onValueChange={(value) => setTopUpAmount(value)}
  //         />
  //       </View>
  //       <AppButton
  //         loading={isPending}
  //         disabled={isPending}
  //         mode="contained"
  //         onPress={onTopUpConfirm}>
  //         Doładuj
  //       </AppButton>
  //     </Modal>
  //   </Container>
  // );
  return (
    <AppButton onPress={() => navigation.push('PaymentMethod')}>
      Click me
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
