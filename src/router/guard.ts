import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import NProgress from 'nprogress';
import { AUTH_CALLBACK_PATH, HOME_PATH, LOGIN_PATH } from '@/model/path';
import { AUTH_TOKEN_NAME } from '@/config/index.config';
import { StorageUtil } from '@/utils/oauth/storage.util';
import { OAuthUtils } from '@/utils/oauth/index.util';

const redirectToLoginCheck = (path: string, cb: (path?: string) => void) => {
  if (path === LOGIN_PATH) {
    const auth_token: string | null =
      window.localStorage.getItem(AUTH_TOKEN_NAME);
    auth_token ? cb(HOME_PATH) : cb(); // 若进入的页面是登录页，且已存在token，直接重定向至HOME页面
  }
}

const routerBeforeGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  NProgress.start();
  //测试-直接放开
  next();
  return;
  const requiresAuth: boolean | unknown = to.meta.requiresAuth;
  if (requiresAuth) {
    next();
    const auth_token = StorageUtil.getAuthToken();
    !auth_token ? await OAuthUtils.logout() : next(); // 若无auth_token，直接重定向至登录页
  }
  next();
};

const routerAfterEach = () => {
  NProgress.done();
};

/**
 * @description OAuth登录，拦截器
 * @param to 拦截器
 * @returns
 */
 const routerOAuthLogin = async (to: RouteLocationNormalized) => {
  if (to.path === AUTH_CALLBACK_PATH) {
    try {
      await OAuthUtils.callback(to.query);
    } catch (error) {
      return false;
    }
  }
};

export { routerBeforeGuard, routerAfterEach, routerOAuthLogin };
