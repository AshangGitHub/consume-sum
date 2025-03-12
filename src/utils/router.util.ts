import { logout } from '@/http/login';
import router from '@/router';

/**
 * @description: 路由工具类
 */
export class RouterUtil {
  static async redirectToLogin() {
    /** 清空storage */
    localStorage.clear();
    router.replace({
      path: '/login',
    });
  }

  /**
   * @description: 跳轉到首頁
   */
  static redirectToHome() {
    router.replace({
      path: '/',
    });
  }
}
