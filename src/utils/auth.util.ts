import { GLOBAL_API_PATH_PREFIX } from '@/config/index.config';
import { auth } from '@/model/api/auth';
import { HOME_PATH } from '@/model/path';
import router from '@/router';
import {
  clearAuthToken,
  setAuthToken,
  getAuthToken
} from './auth';
import { RouterUtil } from './router.util';
import { OAuthUtils } from './oauth/index.util';

// 全局登录处理
export class AuthUtil {
  static logined(token: string) {
    setAuthToken(token);
    ElMessage({
      message: '登录成功',
      type: 'success',
      duration: 1000,
    });
  }

  static getToken() {
    return getAuthToken();
  }

  static loginChildApplication(params: {
    response_type: string;
    client_id: string;
    redirect_uri: string;
  }): void {
    const url = `${import.meta.env.VITE_BASE_URL}${GLOBAL_API_PATH_PREFIX}${auth.authorize}?response_type=${params.response_type}&client_id=${params.client_id}&redirect_uri=${params.redirect_uri}`;
    window.location.replace(url);
  }

  static logout() {
    clearAuthToken();
    OAuthUtils.logout()
  }
}
