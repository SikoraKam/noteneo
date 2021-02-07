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

type PasswordResetConfirmScreenProps = StackScreenProps<
  AuthScreenStackParamList,
  'PasswordResetConfirm'
>;

interface PasswordResetConfirmFormData {
  email: string;
  token: string;
  password: string;
  passwordConfirm: string;
}

const PasswordResetConfirmSchema = yup.object().shape({
  email: yup
    .string()
    .email('Podaj poprawny adres email')
    .required('Adres email jest wymagany'),
  token: yup.string(),
  password: yup
    .string()
    .min(8, 'Hasło musi składać się z min. 8 znaków')
    .required('Hasło jest wymagane'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Hasła muszą się zgadzać')
    .required('Powtórz hasło'),
});

export const PasswordResetConfirmScreen: React.FC<PasswordResetConfirmScreenProps> = ({
  navigation,
}) => {
  const {
    register,
    setValue,
    errors,
    setError,
    handleSubmit,
  } = useForm<PasswordResetConfirmFormData>({
    resolver: yupResolver(PasswordResetConfirmSchema),
  });

  const [isPending, setPending] = useState(false);
  const { resetPassword } = useAuth();

  useEffect(() => {
    register('email');
    register('token');
    register('password');
    register('passwordConfirm');
  }, [register]);

  const onResetPassword = async ({
    email,
    token,
    password,
    passwordConfirm,
  }: PasswordResetConfirmFormData) => {
    Keyboard.dismiss();

    setPending(true);
    try {
      await resetPassword(email, token, password, passwordConfirm);
      navigation.navigate('Login');
    } catch (error) {
      setResponseErrors(error, setError);
    } finally {
      setPending(false);
    }
  };

  return (
    <Container>
      <PaddedInputScrollView>
        <Paragraph style={styles.info}>
          Podaj odpowiednie dane do zmiany hasła
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
        <View style={styles.row}>
          <AppInput
            label="Token"
            mode="outlined"
            error={!!errors.token}
            onChangeText={(value) => setValue('token', value)}
          />
          {!!errors.email && (
            <HelperText type="error" visible={!!errors.email}>
              {errors.email?.message}
            </HelperText>
          )}
        </View>
        <View style={styles.row}>
          <AppInput
            secureTextEntry
            label="Hasło"
            mode="outlined"
            autoCompleteType="password"
            error={!!errors.password}
            onChangeText={(value) => setValue('password', value)}
          />
          {!!errors.password && (
            <HelperText type="error" visible={!!errors.password}>
              {errors.password?.message}
            </HelperText>
          )}
        </View>
        <View style={styles.row}>
          <AppInput
            secureTextEntry
            label="Powtórz hasło"
            mode="outlined"
            error={!!errors.passwordConfirm}
            onChangeText={(value) => setValue('passwordConfirm', value)}
          />
          {!!errors.passwordConfirm && (
            <HelperText type="error" visible={!!errors.passwordConfirm}>
              {errors.passwordConfirm?.message}
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
