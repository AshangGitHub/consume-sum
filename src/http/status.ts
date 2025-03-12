import { OAuthUtils } from '@/utils/oauth/index.util';
import { RouterUtil } from '@/utils/router.util';

export const getMessage = (status: number): string => {
  let message = '';
  switch (status) {
    case 400:
      message = '请求错误';
      break;
    case 401:
      message = '授权过期，请重新登录';
      OAuthUtils.logout()
      return message;
    case 403:
      message = '拒绝访问';
      break;
    case 500:
      message = '服务器错误';
      break;
    default:
      message = `连接出错(${status})`;
  }
  return `${message}，请检查网络或联系管理员！`;
};
