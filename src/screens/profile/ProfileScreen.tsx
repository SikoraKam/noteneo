import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ProfileScreenStackParamList } from './ProfileScreenStack';

type ProfileScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  'Profile'
>;

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  return <></>;
};
