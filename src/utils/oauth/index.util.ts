import { loginWithCode } from '@/http/oauth';
import { AUTH_CALLBACK_PATH, HOME_PATH, LOGIN_PATH } from '@/model/path';
import { LocationQuery } from 'vue-router';
import { StorageUtil } from './storage.util';
import { logout as logoutAPI } from '@/http/oauth';
import router from '@/router';
import { ToolUtils } from './tool.util';

export class OAuthUtils {
  /**
   * @description 通过code登录系统
   * @param query
   */
  static async callback(query: LocationQuery) {
    if (query.code) {
      const code = query.code as string;
      const { access_token } = await loginWithCode(code);
      StorageUtil.setAuthToken(access_token);
      StorageUtil.setUserName('admin');
      // const res = await getCurrentUser();
      // StorageUtil.setPermissions(res.permissionCode);
      router.replace(HOME_PATH);
    } else {
      this.logout();
      throw new Error('code is null');
    }
  }

  /**
   * @description 登出
   */
  static async logout() {
    //非统一认证，清空token并退至login
    StorageUtil.clearCache();
    router.replace(LOGIN_PATH);
    // await logoutAPI();
    // StorageUtil.clearCache();
    // const redirect_uri = `${window.location.origin}/${import.meta.env.VITE_PUBLISH_DIR}${AUTH_CALLBACK_PATH}`;
    // const queryParams = {
    //   redirect_uri,
    //   client_id: import.meta.env.VITE_LOGIN_CLIENT_ID,
    //   redirect_type: 'code',
    // };
    // const authenticateUrl = ToolUtils.buildUrl({
    //   domain: import.meta.env.VITE_AUTHORIZE_URL,
    //   queryParams,
    // })
    // window.location.replace(authenticateUrl);
  }
}
