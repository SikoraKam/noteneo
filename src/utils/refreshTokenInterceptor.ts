import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

import axios from './axios';
import { deleteToken, setToken } from './tokenUtils';

interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * Axios request interceptor
 * Intercepts requests which failed because of token expiration
 * and tries to auto-refresh the token.
 * If token refreshing fails it removes the token from the app storage.
 * @param failedRequest
 */
export const refreshTokenInterceptor = async (failedRequest: any) => {
  try {
    const response = await axios.post<RefreshTokenResponse>(
      'auth/refresh',
      null,
      {
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig
    );
    const { access_token } = response.data;
    await setToken(access_token);

    failedRequest.response.config.headers[
      'Authorization'
    ] = `Bearer ${access_token}`;
  } catch (error) {
    await deleteToken();
    return Promise.reject(error);
  }
};
