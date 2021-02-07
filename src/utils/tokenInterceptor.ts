import { AxiosRequestConfig } from 'axios';

import { getToken } from './tokenUtils';

/**
 * Axios request interceptor
 * Automatically attaches JWT token to each request
 * @param config
 */
export const tokenInterceptor = async (config: AxiosRequestConfig) => {
  const token = await getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};
