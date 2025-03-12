import { AUTH_TOKEN_NAME } from '@/config/index.config';
import { LOGIN_PATH } from '@/model/path';
import router from '@/router';

const setAuthToken = (auth_token: string | unknown) => {
  if (!auth_token) clearAuthToken();
  window.localStorage.setItem(AUTH_TOKEN_NAME, auth_token as string);
};

export const getAuthToken = (auth_token?: string | unknown): string => {
  // if (!auth_token) clearAuthToken();
  return window.localStorage.getItem(AUTH_TOKEN_NAME) + '';
};

const clearAuthToken = () => {
  window.localStorage.removeItem(AUTH_TOKEN_NAME);
  router.replace(LOGIN_PATH);
};
export { setAuthToken, clearAuthToken };
