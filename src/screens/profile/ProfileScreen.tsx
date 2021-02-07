import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ProfileScreenStackParamList } from './ProfileScreenStack';
import { ListPlaceholder } from '../../utils/ListPlaceholder';
import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../components/shared/AppText';

type ProfileScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  'Profile'
>;

const profile = {
  data: {
    versioned_avatar: require('../../../assets/noteneo-logo.png'),
    name: 'Franek',
    elo: 1000,
  },
  isFetching: false,
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  return (
    <ContainerWithAvatar
      avatar={profile.data.versioned_avatar}
      isLoading={profile.isFetching}>
      <View style={styles.meta}>
        <AppText variant="h1">{profile.data?.name}</AppText>
        <AppText variant="h3">Punkty rankingowe: {profile.data?.elo}</AppText>
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
