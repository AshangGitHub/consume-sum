import { HttpResponse } from '@/interface';

/**
 * @description 登錄接口參數
 * @param {string} email - 登錄郵箱
 * @param {string} password - 密码
 */
export type LoginRequest = {
  username: string;
  password: string;
};

/**
 * @description 登錄接口返回值
 */
export interface LoginResponse extends HttpResponse {
  id?: number;
  name: string;
  permissionCode: string[];
  token: string;
  version: number;
}
