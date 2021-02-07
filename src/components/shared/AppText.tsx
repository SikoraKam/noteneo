import React, { ComponentProps } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Paragraph } from 'react-native-paper';

type AppTextProps = ComponentProps<typeof Paragraph> & {
  variant?: 'h1' | 'h2' | 'h3';
};

export const AppText: React.FC<AppTextProps> = (props) => {
  const style = styles[props.variant ?? 'default'];
  return (
    <Text {...props} style={[style, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  default: {
    fontSize: 14,
    fontWeight: 'normal',
  },
});
