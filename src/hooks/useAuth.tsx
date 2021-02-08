import React, { createContext, useContext, useEffect, useState } from 'react';

import { EventBus } from '../utils/eventBus';
import { useAxios } from './useAxios';
import {
  deleteAccessToken,
  deleteRefreshToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../utils/tokenUtils';
import { SignInResponse } from '../types/auth/sign-in-response';
import { ACCESS_TOKEN_CHANGED_EVENT } from '../const/events.const';

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
  const axios = useAxios();

  const register = async (nick: string, email: string, password: string) => {
    return axios.post('auth/signup', {
      name: nick,
      email,
      password,
    });
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post<SignInResponse>('user/token/', {
      email,
      password,
    });
    const { access, refresh } = response.data;
    await Promise.all([setAccessToken(access), setRefreshToken(refresh)]);
  };

  const logout = async () => {
    const refreshToken = await getRefreshToken();
    await axios.post('user/logout/', {
      refresh_token: refreshToken,
    });
    await Promise.all([deleteAccessToken(), deleteRefreshToken()]);
  };

  // const initiatePasswordReset = (email: string) => {
  //   return axios.post('auth/forgot-password', {
  //     email,
  //   });
  // };

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
  //     password_confirmation: passwordConfirmation,
  //   });
  // };

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = await getAccessToken();
      setToken(storedToken);
      setLoading(false);
    };
    initAuth();
  }, []);

  useEffect(() => {
    const unsubscribe = EventBus.on(ACCESS_TOKEN_CHANGED_EVENT, async () => {
      const newToken = await getAccessToken();
      setToken(newToken);
    });
    return () => {
      unsubscribe();
    };
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
