import * as React from 'react';
import { useTheme } from 'react-native-paper';

import { AppButton } from './AppButton';

type HeaderAppButtonProps = React.ComponentProps<typeof AppButton> & {
  inverse?: boolean;
};

export const HeaderAppButton: React.FC<HeaderAppButtonProps> = (props) => {
  const theme = useTheme();
  return (
    <AppButton
      {...props}
      compact
      color={
        props.inverse
          ? theme.headerButtonLabel.inverseColor
          : theme.colors.white
      }
      labelStyle={[
        props.labelStyle,
        { fontSize: theme.headerButtonLabel.fontSize },
      ]}
    />
  );
};
