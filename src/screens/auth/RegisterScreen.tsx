import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions, Keyboard, StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  HelperText,
  Paragraph,
  Portal,
} from 'react-native-paper';
import * as yup from 'yup';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { AppButton } from '../../components/shared/AppButton';
import { AppInput } from '../../components/shared/AppInput';
import { Logo } from '../../components/shared/Logo';
import { useAuth } from '../../hooks/useAuth';
import { setResponseErrors } from '../../utils/setResponseErrors';
import { AuthScreenStackParamList } from './AuthScreenStack';

type RegisterScreenProps = StackScreenProps<
  AuthScreenStackParamList,
  'Register'
>;

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const RegisterSchema = yup.object().shape({
  name: yup.string().required('Nick jest wymagany'),
  email: yup
    .string()
    .email('Podaj poprawny adres email')
    .required('Adres email jest wymagany'),
  password: yup
    .string()
    .min(8, 'Hasło musi składać się z min. 8 znaków')
    .required('Hasło jest wymagane'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Hasła muszą się zgadzać')
    .required('Powtórz hasło'),
});

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  navigation,
}) => {
  const { register: registerUser } = useAuth();
  const [isPending, setPending] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const {
    register,
    setValue,
    setError,
    errors,
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterSchema),
  });

  useEffect(() => {
    register('name');
    register('email');
    register('password');
    register('passwordConfirm');
  }, [register]);

  const onRegister = async ({ name, email, password }: RegisterFormData) => {
    Keyboard.dismiss();
    setPending(true);

    try {
      await registerUser(name, email, password);
      setSuccessModalOpen(true);
    } catch (error) {
      setResponseErrors(error, setError);
    }

    setPending(false);
  };

  return (
    <Container>
      <View style={styles.logoContainer}>
        <Logo style={styles.logo} />
      </View>
      <PaddedInputScrollView>
        <View style={styles.row}>
          <AppInput
            label="Nick"
            mode="outlined"
            autoCompleteType="username"
            error={!!errors.name}
            onChangeText={(value) => setValue('name', value)}
          />
          {!!errors.name && (
            <HelperText type="error" visible={!!errors.name}>
              {errors.name?.message}
            </HelperText>
          )}
        </View>
        <View style={styles.row}>
          <AppInput
            label="Email"
            mode="outlined"
            autoCompleteType="email"
            keyboardType="email-address"
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
            loading={isPending}
            disabled={isPending}
            mode="contained"
            onPress={handleSubmit(onRegister)}>
            Zarejestruj
          </AppButton>
        </View>
      </PaddedInputScrollView>
      <Portal>
        <Dialog
          visible={isSuccessModalOpen}
          onDismiss={() => setSuccessModalOpen(false)}>
          <Dialog.Title accessibilityComponentType="" accessibilityTraits="">
            Sukces
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Twoje konto zostało pomyślnie zarejestrowane! Aktywuj je za pomocą
              linku, który otrzymałeś na podany adres email, a następnie przejdź
              do logowania.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              accessibilityTraits=""
              accessibilityComponentType=""
              onPress={() => {
                setSuccessModalOpen(false);
                navigation.navigate('Login');
              }}>
              Przejdź do logowania
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Container>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    left: -10,
    height: 100,
    width: Dimensions.get('window').width - 20,
    resizeMode: 'contain',
  },
  row: {
    marginBottom: 8,
  },
  actions: {
    marginTop: 24,
  },
});
