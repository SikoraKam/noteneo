import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, View } from 'react-native';
import { HelperText, Paragraph } from 'react-native-paper';
import * as yup from 'yup';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { AppButton } from '../../components/shared/AppButton';
import { AppInput } from '../../components/shared/AppInput';
import { useAuth } from '../../hooks/useAuth';
import { setResponseErrors } from '../../utils/setResponseErrors';
import { AuthScreenStackParamList } from './AuthScreenStack';

type PasswordResetScreenProps = StackScreenProps<
  AuthScreenStackParamList,
  'PasswordReset'
>;

interface PasswordResetFormData {
  email: string;
}

const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email('Podaj poprawny adres email')
    .required('Adres email jest wymagany'),
});

export const PasswordResetScreen: React.FC<PasswordResetScreenProps> = ({
  navigation,
}) => {
  const {
    register,
    setValue,
    errors,
    setError,
    handleSubmit,
  } = useForm<PasswordResetFormData>({
    resolver: yupResolver(RegisterSchema),
  });

  const { initiatePasswordReset } = useAuth();
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    register('email');
  }, [register]);

  const onResetPassword = async ({ email }: PasswordResetFormData) => {
    Keyboard.dismiss();

    setPending(true);
    try {
      await initiatePasswordReset(email);
      navigation.navigate('PasswordResetConfirm');
    } catch (error) {
      setResponseErrors(error, setError);
      const generalMessage = error.response?.data?.errors?.all;
      if (!generalMessage) {
        alert('Upewnij się że wprowadziłeś poprawny email');
        return;
      }
      if (generalMessage) {
        setError('email', {
          type: 'server',
          message: generalMessage,
        });
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <Container>
      <PaddedInputScrollView>
        <Paragraph style={styles.info}>
          Podaj adres email, który został użyty podczas rejestracji. Prześlemy
          na niego link, którym dokonasz resetu hasła
        </Paragraph>
        <View style={styles.row}>
          <AppInput
            label="Adres email"
            mode="outlined"
            keyboardType="email-address"
            autoCompleteType="email"
            error={!!errors.email}
            onChangeText={(value) => setValue('email', value)}
          />
          {!!errors.email && (
            <HelperText type="error" visible={!!errors.email}>
              {errors.email?.message}
            </HelperText>
          )}
        </View>
        <View style={styles.actions}>
          <AppButton
            mode="contained"
            loading={isPending}
            disabled={isPending}
            onPress={handleSubmit(onResetPassword)}>
            Resetuj hasło
          </AppButton>
        </View>
      </PaddedInputScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  info: {
    textAlign: 'center',
    letterSpacing: 0,
  },
  row: {
    marginTop: 32,
  },
  actions: {
    marginTop: 16,
  },
});
