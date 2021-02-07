import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      secondary: string;
      lightGray: string;
      darkGray: string;
      white: string;
      black: string;
    }

    interface Theme {
      tallHeader: any;
      whiteHeader: any;
      primaryHeader: any;
      headerButtonLabel: {
        fontSize: number;
        inverseColor: string;
      };
    }
  }
}

const fontConfig = {
  default: {
    thin: {
      fontFamily: 'Inter_100Thin',
      fontWeight: '100' as '100',
    },
    light: {
      fontFamily: 'Inter_300Light',
      fontWeight: '300' as '300',
    },
    regular: {
      fontFamily: 'Inter_400Regular',
      fontWeight: '400' as '400',
    },
    medium: {
      fontFamily: 'Inter_500Medium',
      fontWeight: '500' as '500',
    },
  },
};

const colors = {
  primary: '#2F80ED',
  secondary: '#05dede',
  lightGray: '#F6F6F6',
  darkGray: '#E8E8E8',
  white: '#FFFFFF',
  black: '#000000',
  background: '#FFFFFF',
  placeholder: '#BDBDBD',
  error: '#EB5757',
};

export const theme = {
  ...PaperDefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDefaultTheme.colors,
    ...colors,
  },
  headerButtonLabel: {
    fontSize: 14,
    inverseColor: colors.primary,
  },
  primaryHeader: {
    headerTitleAlign: 'center',
    headerStyle: {
      elevation: 0,
      height: 120,
      backgroundColor: colors.primary,
      shadowColor: 'transparent',
    },
    headerTitleStyle: {
      fontSize: 30,
      textAlign: 'center',
      color: colors.white,
    },
  },
  whiteHeader: {
    headerTitleAlign: 'center',
    headerStyle: {
      elevation: 0,
      shadowColor: 'transparent',
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      fontSize: 30,
      textAlign: 'center',
    },
  },
  tallHeader: {
    headerTitleAlign: 'center',
    headerStyle: {
      elevation: 0,
      backgroundColor: colors.primary,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
    },
    headerTitleStyle: {
      color: colors.white,
      fontSize: 30,
      textAlign: 'center',
    },
    headerTitleContainerStyle: {
      height: '100%',
    },
    headerLeftContainerStyle: {
      justifyContent: 'flex-start',
      marginLeft: 4,
    },
    headerRightContainerStyle: {
      justifyContent: 'flex-start',
      marginRight: 4,
    },
  },
};
