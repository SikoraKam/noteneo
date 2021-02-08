import { AxiosRequestConfig } from 'axios';
import { getAccessToken } from '../../utils/tokenUtils';

/**
 * Axios request interceptor
 * Automatically attaches JWT token to each request
 * @param config
 */
export const tokenInterceptor = async (config: AxiosRequestConfig) => {
  const token = await getAccessToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};
