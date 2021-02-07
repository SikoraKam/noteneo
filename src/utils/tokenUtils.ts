/**
 * Mock web implementation of tokenUtils.native
 */
import { TOKEN_STORAGE_KEY } from '../const/auth.const';
import { TOKEN_CHANGED_EVENT } from '../const/events.const';
import { EventBus } from './eventBus';

export const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const setToken = async (token: string) => {
  await localStorage.setItem(TOKEN_STORAGE_KEY, token);
  EventBus.emit(TOKEN_CHANGED_EVENT);
};

export const deleteToken = async () => {
  await localStorage.removeItem(TOKEN_STORAGE_KEY);
  EventBus.emit(TOKEN_CHANGED_EVENT);
};
