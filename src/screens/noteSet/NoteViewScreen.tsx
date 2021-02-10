import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { NoteSetScreenStackParamList } from './NoteSetScreenStack';
import { StyleSheet, Text, View } from 'react-native';
import { NoteView } from '../../components/note/NoteView';
import { Container } from '../../components/layout/Container';
import { useQueryClient } from 'react-query';
import { QUERY_USER_PROFILE_KEY } from '../../const/query.const';
import { useUserProfileQuery } from '../../hooks/user/useUserProfileQuery';
import { useUserCheckoutSessionQuery } from '../../hooks/user/useUserCheckoutSessionQuery';
import { StripeCheckout } from '../../components/stripe/StripeCheckout';
import { Button, Paragraph, Title } from 'react-native-paper';

type NoteViewScreenProps = StackScreenProps<
  NoteSetScreenStackParamList,
  'NoteView'
>;

export const NoteViewScreen: React.FC<NoteViewScreenProps> = ({
  navigation,
  route,
}) => {
  const profile = useUserProfileQuery();
  const [hasInvalidated, setHasInvalidated] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const userProfile = useUserProfileQuery();
  const sessionId = useUserCheckoutSessionQuery();
  const queryClient = useQueryClient();

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

  /**
   * Update user has_access status
   */
  useEffect(() => {
    if (!hasInvalidated && profile.isSuccess && !profile.data.is_subscriber) {
      queryClient.invalidateQueries(QUERY_USER_PROFILE_KEY);
      setHasInvalidated(true);
    }
  }, [profile.isSuccess, hasInvalidated, profile.data]);

  return (
    <Container>
      {profile.isSuccess && profile.data.has_access && (
        <NoteView noteId={route.params.noteId} />
      )}
      {profile.isSuccess && !profile.data.has_access && (
        <View style={styles.info}>
          <Title style={styles.textCenter}>Nie ma nic za darmo</Title>
          <Paragraph style={styles.textCenter}>
            Wydaje się jakby dopiero wczoraj Twój limit darmowych notatek został
            odnowiony, a tu okazuje się, że znowu go przekroczyłeś!
          </Paragraph>
          <Paragraph style={[styles.textCenter, { marginVertical: 16 }]}>
            Pokaż somsiadowi, że jesteś od niego lepszy - wykup subskrybcję już
            dziś!
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
    </Container>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
    letterSpacing: 0,
  },
  info: {
    padding: 16,
  },
});
