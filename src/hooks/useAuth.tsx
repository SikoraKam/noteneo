import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utils/axios';
import {
  deleteToken as deleteStoredToken,
  getToken as getStoredToken,
  setToken as setStoredToken,
} from '../utils/tokenUtils';

type AuthContextData = ReturnType<typeof useProvideAuth>;

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  const isAuthenticated = token !== null;

  const register = async (nick: string, email: string, password: string) => {
    return axios.post('user/register', {
      name: nick,
      email,
      password,
    });
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post('user/token/', {
      email,
      password,
    });
    const token = response.data.access_token;
    await setStoredToken(token);
  };

  const logout = async () => {
    await axios.post('user/logout');
    await deleteStoredToken();
  };

  // const initiatePasswordReset = (email: string) => {
  //   return axios.post('auth/forgot-password', {
  //     email
  //   });
  // };
  //
  // const resetPassword = (
  //   email: string,
  //   token: string,
  //   password: string,
  //   passwordConfirmation: string
  // ) => {
  //   return axios.post('auth/reset-password', {
  //     token,
  //     email,
  //     password,
  //     password_confirmation: passwordConfirmation
  //   });
  // };

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = await getStoredToken();
      setToken(storedToken);
      setLoading(false);
    };
    initAuth();
  }, []);

  return {
    isLoading,
    isAuthenticated,
    register,
    login,
    logout,
    // initiatePasswordReset,
    // resetPassword,
    token,
  };
};
