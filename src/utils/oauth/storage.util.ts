import { AUTH_TOKEN_NAME, AUTH_USER_NAME, PERMISSIONS_NAME } from '@/config/index.config';

export class StorageUtil {
  static setAuthToken = (auth_token: string | unknown) => {
    if (!auth_token) this.clearAuthToken();
    window.localStorage.setItem(AUTH_TOKEN_NAME, auth_token as string);
  };

  static setPermissions = (permissions: string[]) => {
    if (!permissions.length) this.clearPermissions();
    window.localStorage.setItem(
      PERMISSIONS_NAME,
      JSON.stringify(permissions) as string
    );
  };

  static setUserName = (name: string) => {
    if (!name) return;
    window.localStorage.setItem('name', name);
  };

  static getUserName = () => {
    return window.localStorage.getItem(AUTH_USER_NAME);
  };


  static clearAuthToken = () => {
    window.localStorage.removeItem(AUTH_TOKEN_NAME);
    window.localStorage.removeItem('name');
  };

  static clearPermissions = () => {
    window.localStorage.removeItem(PERMISSIONS_NAME);
  };

  static getAuthToken() {
    return window.localStorage.getItem(AUTH_TOKEN_NAME);
  }

  static clearCache() {
    StorageUtil.clearPermissions(); // 清除权限
    StorageUtil.clearAuthToken(); // 清除token
  }
}
