import * as SecureStore from 'expo-secure-store';

import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../const/auth.const';
import {
  ACCESS_TOKEN_CHANGED_EVENT,
  REFRESH_TOKEN_CHANGED_EVENT,
} from '../const/events.const';
import { EventBus } from './eventBus';

/**
 * Retrieve access token from SecureStore
 */
export const getAccessToken = () =>
  SecureStore.getItemAsync(ACCESS_TOKEN_STORAGE_KEY);

/**
 * Retrieve refresh token from SecureStore
 */
export const getRefreshToken = () =>
  SecureStore.getItemAsync(REFRESH_TOKEN_STORAGE_KEY);

/**
 * Save access token in SecureStore and emit change event
 * @param token - JWT token
 */
export const setAccessToken = async (token: string) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_STORAGE_KEY, token);
  EventBus.emit(ACCESS_TOKEN_CHANGED_EVENT);
};

/**
 * Save refresh token in SecureStore and emit change event
 * @param token - JWT token
 */
export const setRefreshToken = async (token: string) => {
  await SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, token);
  EventBus.emit(REFRESH_TOKEN_CHANGED_EVENT);
};

/**
 * Remove access token from SecureStore and emit change event
 */
export const deleteAccessToken = async () => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_STORAGE_KEY);
  EventBus.emit(ACCESS_TOKEN_CHANGED_EVENT);
};

/**
 * Remove refresh token from SecureStore and emit change event
 */
export const deleteRefreshToken = async () => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_STORAGE_KEY);
  EventBus.emit(ACCESS_TOKEN_CHANGED_EVENT);
};
