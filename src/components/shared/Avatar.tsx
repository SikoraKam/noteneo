import * as React from 'react';
import { useMemo } from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { theme } from '../../theme';

interface AvatarProps {
  size: number;
  src: ImageSourcePropType | undefined | null;
  border?: number;
  elevation?: number;
  borderRadius?: number;
  containerStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

const shadow = {
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowRadius: 4,
  shadowOpacity: 1,
  shadowOffset: {
    width: 0,
    height: 4,
  },
};

const avatarPlaceholder = require('../../../assets/versioned_initial_avatar.png').toString();

export const Avatar: React.FC<AvatarProps> = ({
  size,
  src,
  border = 0,
  elevation = 0,
  borderRadius = 100,
  containerStyle,
  isLoading,
}) => {
  const containerStyles = useMemo(
    () => [
      styles.container,
      {
        elevation,
        height: size,
        width: size,
        borderRadius,
      },
      Platform.OS === 'ios' && elevation !== undefined ? shadow : {},
      containerStyle,
    ],
    [elevation, size, borderRadius, containerStyle]
  );

  const imageStyles = useMemo(
    () => [
      styles.avatar,
      {
        height: size,
        width: size,
        borderWidth: border,
        borderRadius,
      },
    ],
    [size, border, borderRadius]
  );

  if (isLoading) {
    return (
      <SkeletonPlaceholder>
        <View style={containerStyles}>
          <View style={imageStyles} />
        </View>
      </SkeletonPlaceholder>
    );
  }

  return (
    <View style={containerStyles}>
      <Image style={imageStyles} source={src ?? avatarPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  avatar: {
    borderColor: theme.colors.white,
  },
});
