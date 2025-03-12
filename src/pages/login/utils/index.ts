import { AUTH_TOKEN_NAME } from '@/config/index.config';
import { LoginResponse } from '@/http/login/type';
import { RouterUtil } from '@/utils/router.util';

/**
 * @description 當頁面加載完畢
 */
export const onLogined = (response: LoginResponse) => {
  const storage = window.localStorage;
  storage.setItem(AUTH_TOKEN_NAME, response.labFssAdminToken);
  RouterUtil.redirectToHome();
};
