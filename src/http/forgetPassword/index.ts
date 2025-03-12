import { axiosInstance } from '@/http';
import { IForgetPwdForm } from './type';
import { auth } from '@/model/api/auth';

/**
 * @description: 忘记密码-修改密码
 * @param {IForgetPwdForm} 参数
 * @returns {Promise}
 */
export const forgetPassword = (params: IForgetPwdForm): Promise<boolean> =>
  axiosInstance.post(auth.forgetPassword, params);

/**
 * @description 退出登录
 * @returns void
 */
export const sendEmailCode = (account: string): Promise<boolean> =>
  axiosInstance.post(`${auth.sendEmailCode}`, { account: account });
