import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface ContainerProps {
  style?: StyleProp<ViewStyle>;
}

export const Container: React.FC<ContainerProps> = ({ style, children }) => (
  <View style={[styles.container, style]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 100,
  },
});
