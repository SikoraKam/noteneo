import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

import axios from './axios';
import {
  deleteAccessToken,
  deleteRefreshToken,
  getRefreshToken,
  setAccessToken,
} from '../../utils/tokenUtils';

/**
 * Axios request interceptor
 * Intercepts requests which failed because of token expiration
 * and tries to auto-refresh the token.
 * If token refreshing fails it removes the token from the app storage.
 * @param failedRequest
 */
export const refreshTokenInterceptor = async (failedRequest: any) => {
  try {
    const refreshToken = await getRefreshToken();
    const response = await axios.post<RefreshTokenResponse>(
      'user/token/refresh/',
      {
        refresh: refreshToken,
      },
      {
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig
    );
    const { access } = response.data;
    await setAccessToken(access);

    failedRequest.response.config.headers['Authorization'] = `Bearer ${access}`;
  } catch (error) {
    await Promise.all([deleteAccessToken(), deleteRefreshToken()]);
    return Promise.reject(error);
  }
};
