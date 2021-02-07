import React from 'react';
import { TextInput } from 'react-native-paper';

export type AppInputProps = Omit<
  React.ComponentProps<typeof TextInput>,
  'accessibilityTraits' | 'accessibilityComponentType'
>;

export const AppInput: React.FC<AppInputProps> = (props) => (
  <TextInput
    {...props}
    accessibilityComponentType=""
    accessibilityTraits=""
    theme={{ roundness: 10 }}
  />
);
