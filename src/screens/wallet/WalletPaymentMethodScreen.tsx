// import { StackScreenProps } from '@react-navigation/stack';
// import React, { useState } from 'react';
// import { StyleSheet, View } from 'react-native';
// // import { CreditCardInput } from 'react-native-credit-card-input';
// //
// // import { Container } from '../../components/layout/Container';
// // import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
// // import { AppButton } from '../../components/shared/AppButton';
// // import { AppText } from '../../components/shared/AppText';
// // import { useUpdateUserPaymentMethodMutation } from '../../hooks/payments/useUpdateUserPaymentMethodMutation';
// // import { useUserHasActivePaymentMethodQuery } from '../../hooks/payments/useUserHasActivePaymentMethodQuery';
// // import { Stripe } from '../../lib/stripe';
// // import { CreditCardInputResult } from '../../types/credit-card-input-result';
// // import { CreatePaymentMethodPayload } from '../../types/payments/create-payment-method-payload';
// import { WalletScreenStackParamList } from './WalletScreenStack';
//
// type WalletPaymentMethodScreenProps = StackScreenProps<
//   WalletScreenStackParamList,
//   'PaymentMethod'
// >;
//
// // const preparePaymentMethodPayload = (
// //   card: CreditCardInputResult
// // ): CreatePaymentMethodPayload => {
// //   const { number, expiry, cvc } = card.values;
// //   const [exp_month, exp_year] = expiry.split('/');
// //
// //   return {
// //     type: 'card',
// //     card: {
// //       number,
// //       cvc,
// //       exp_month,
// //       exp_year,
// //     },
// //   };
// // };
//
// export const WalletPaymentMethodScreen: React.FC<WalletPaymentMethodScreenProps> = ({
//   navigation,
// }) => {
//   // const [card, setCard] = useState<CreditCardInputResult | null>(null);
//   // const updatePaymentMethod = useUpdateUserPaymentMethodMutation();
//   // const [isPending, setPending] = useState(false);
//   // const hasActivePaymentMethod = useUserHasActivePaymentMethodQuery().data;
//   // const [isUpdatingPaymentMethod, setUpdatingPaymentMethod] = useState(false);
//   //
//   // const onSave = async () => {
//   //   if (!card || !card.valid) {
//   //     alert('Wprowadź prawidłowe dane');
//   //     return;
//   //   }
//   //
//   //   setPending(true);
//   //
//   //   try {
//   //     const response = await Stripe.createPaymentMethod(
//   //       preparePaymentMethodPayload(card)
//   //     );
//   //     const { id } = response.data;
//   //     await updatePaymentMethod.mutateAsync(id);
//   //     navigation.navigate('Wallet');
//   //   } catch (error) {
//   //     alert(
//   //       'Podczas zapisywania metody płatności wystąpił błąd. Spróbuj ponownie lub skontaktuj się z supportem.'
//   //     );
//   //     console.log(error.response);
//   //   } finally {
//   //     setPending(false);
//   //   }
//   // };
//   //
//   // if (hasActivePaymentMethod && !isUpdatingPaymentMethod) {
//   //   return (
//   //     <Container>
//   //       <PaddedInputScrollView>
//   //         <AppText style={styles.info}>
//   //           Do Twojego konta została już podpięta karta płatnicza. Jeżeli chcesz
//   //           ją zmienić skorzystaj z przycisku poniżej
//   //         </AppText>
//   //         <AppButton
//   //           mode="contained"
//   //           onPress={() => setUpdatingPaymentMethod(true)}>
//   //           Zmień metodę płatności
//   //         </AppButton>
//   //       </PaddedInputScrollView>
//   //     </Container>
//   //   );
//   // }
//   //
//   // return (
//   //   <Container>
//   //     <PaddedInputScrollView>
//   //       <View style={styles.cardContainer}>
//   //         <CreditCardInput
//   //           onChange={(data: CreditCardInputResult) => setCard(data)}
//   //         />
//   //       </View>
//   //       <AppButton
//   //         loading={isPending}
//   //         disabled={isPending}
//   //         mode="contained"
//   //         onPress={onSave}>
//   //         Zapisz metodę płatności
//   //       </AppButton>
//   //     </PaddedInputScrollView>
//   //   </Container>
//   // );
//   return null;
// };
//
// const styles = StyleSheet.create({
//   info: {
//     textAlign: 'center',
//     paddingVertical: 16,
//   },
//   cardContainer: {
//     paddingVertical: 64,
//   },
// });
