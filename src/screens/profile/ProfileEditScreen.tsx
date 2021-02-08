import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import * as yup from 'yup';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { AppButton } from '../../components/shared/AppButton';
import { AppInput } from '../../components/shared/AppInput';
import { AppText } from '../../components/shared/AppText';
import { AvatarSelectButton } from '../../components/shared/AvatarSelectButton';
// import { useProfileEditMutation } from '../../hooks/useEditProfileMutation';
// import { useUpdateAvatarMutation } from '../../hooks/useUpdateAvatarMutation';
import { setResponseErrors } from '../../utils/setResponseErrors';
import { ProfileScreenStackParamList } from './ProfileScreenStack';
import { useUserProfileUpdateMutation } from '../../hooks/user/useUserProfileUpdateMutation';

type ProfileEditScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  'ProfileEdit'
>;

type ProfileEditFormData = {
  email: string;
  firstName: string;
  lastName: string;
};

const ProfileEditSchema = yup.object().shape({
  email: yup
    .string()
    .email('Podaj poprawny adres email')
    .required('Adres email jest wymagany'),
  firstName: yup.string().required('Imie jest wymagane'),
  lastName: yup.string().required('Nazwisko jest wymagane'),
});

export const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({
  navigation,
  route,
}) => {
  const { mutate } = useUserProfileUpdateMutation();
  const [avatar, setAvatar] = useState<string>(route.params.avatar);
  // const mutateAvatar = useUpdateAvatarMutation();

  const {
    register,
    setValue,
    setError,
    errors,
    handleSubmit,
  } = useForm<ProfileEditFormData>({
    resolver: yupResolver(ProfileEditSchema),
  });

  useEffect(() => {
    register('email');
    register('firstName');
    register('lastName');
  }, [register]);

  const onEdit = async ({
    email,
    firstName,
    lastName,
  }: ProfileEditFormData) => {
    Keyboard.dismiss();

    try {
      await mutate({ email, first_name: firstName, last_name: lastName });
      navigation.push('Profile');
    } catch (error) {
      setResponseErrors(error, setError);
    }
  };
  //
  // const changeAvatar = async (avatarUri: string) => {
  //   setAvatar(avatarUri);
  //   try {
  //     await mutateAvatar.mutateAsync(avatarUri);
  //   } catch (err) {
  //     setResponseErrors(err, setError);
  //     alert('Wystąpił błąd przy zmianie avataru');
  //   }
  // };

  return (
    <ContainerWithAvatar
      // avatar={{ uri: avatar }}
      avatar={require('../../../assets/versioned_initial_avatar.png')}
      button={
        <AvatarSelectButton
          //avatarUri={avatar}
          avatarUri={avatar}
          // onAvatarChange={(avatarUri) => changeAvatar(avatarUri)}
          onAvatarChange={(avatarUri) => console.log(avatarUri)}
        />
      }>
      <View style={styles.meta}>
        <AppText variant="h2">Zmiana danych</AppText>
      </View>
      <PaddedInputScrollView>
        <AppInput
          style={styles.row}
          mode="outlined"
          label="Email"
          error={!!errors.email}
          onChangeText={(text) => setValue('email', text)}
        />
        {!!errors.email && (
          <HelperText type="error" visible={!!errors.email}>
            {errors.email?.message}
          </HelperText>
        )}
        <AppInput
          style={styles.row}
          mode="outlined"
          label="Imie"
          error={!!errors.firstName}
          onChangeText={(text) => setValue('firstName', text)}
        />
        {!!errors.firstName && (
          <HelperText type="error" visible={!!errors.firstName}>
            {errors.firstName?.message}
          </HelperText>
        )}
        <AppInput
          style={styles.row}
          mode="outlined"
          label="Nazwisko"
          error={!!errors.lastName}
          onChangeText={(text) => setValue('lastName', text)}
        />
        {!!errors.lastName && (
          <HelperText type="error" visible={!!errors.lastName}>
            {errors.lastName?.message}
          </HelperText>
        )}
        <View style={styles.action}>
          <AppButton
            mode="contained"
            // disabled={mutateAvatar.isLoading}
            disabled={false}
            onPress={handleSubmit(onEdit)}>
            Zapisz zmiany
          </AppButton>
        </View>
      </PaddedInputScrollView>
    </ContainerWithAvatar>
  );
};

const styles = StyleSheet.create({
  meta: {
    alignItems: 'center',
    marginBottom: 24,
  },
  row: {
    marginBottom: 8,
  },
  action: {
    marginTop: 16,
  },
});
