import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ProfileScreenStackParamList } from './ProfileScreenStack';
import { ListPlaceholder } from '../../utils/ListPlaceholder';
import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../components/shared/AppText';
import { useUserProfileQuery } from '../../hooks/user/useUserProfileQuery';

type ProfileScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  'Profile'
>;

// const profile = {
//   data: {
//     versioned_avatar: require('../../../assets/noteneo-logo.png'),
//     name: 'Franek',
//     elo: 1000,
//   },
//   isFetching: false,
// };

const avatar = require('../../../assets/noteneo-logo.png');

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const profile = useUserProfileQuery();

  return (
    <ContainerWithAvatar avatar={avatar} isLoading={profile.isFetching}>
      <View style={styles.meta}>
        <AppText variant="h1">{profile.data?.first_name}</AppText>
        <AppText variant="h3">
          Konto: {profile.data?.is_subscriber ? 'Premium' : 'Podstawowe'}
        </AppText>
      </View>
    </ContainerWithAvatar>
  );
};

const styles = StyleSheet.create({
  meta: {
    alignItems: 'center',
    marginBottom: 24,
  },
});
