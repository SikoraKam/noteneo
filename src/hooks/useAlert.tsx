import React, { createContext, useContext } from 'react';
import { Alert } from 'react-native';

type AlertContextData = ReturnType<typeof useProvideAlert>;
const AlertContext = createContext<AlertContextData>({} as AlertContextData);

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider: React.FC = ({ children }) => {
  const alert = useProvideAlert();
  return (
    <AlertContext.Provider value={alert}>{children}</AlertContext.Provider>
  );
};

const useProvideAlert = () => {
  const showAlert = (
    title: string,
    message?: string,
    onDismiss?: () => void,
    buttonText?: string
  ) => {
    Alert.alert(title, message, [
      { text: buttonText ?? 'OK', onPress: onDismiss },
    ]);
  };

  return { showAlert };
};
