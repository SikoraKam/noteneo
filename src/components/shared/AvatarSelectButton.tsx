import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { AppButton } from './AppButton';

interface AvatarButtonProps {
  avatarUri: string;
  onAvatarChange(uri: string): void;
}

export const AvatarSelectButton: React.FC<AvatarButtonProps> = (props) => {
  const theme = useTheme();
  const onAvatarButtonClick = async () => {
    if (Platform.OS === 'web') {
      return;
    }
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      alert('Aby wykonać tą akcję zezwól tej aplikacji na dostęp do galerii ');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      props.onAvatarChange(result.uri);
    }
  };

  return (
    <AppButton
      mode="contained"
      style={[styles.appBtnStyle, { backgroundColor: theme.colors.secondary }]}
      onPress={onAvatarButtonClick}>
      Zmień
    </AppButton>
  );
};

const styles = StyleSheet.create({
  appBtnStyle: {
    width: 100,
  },
});
