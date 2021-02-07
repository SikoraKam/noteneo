import React, { ComponentProps } from 'react';
import { Image } from 'react-native';

export const Logo: React.FC<Omit<ComponentProps<typeof Image>, 'source'>> = (
  props
) => <Image {...props} source={require('../../../assets/noteneo-logo.png')} />;
