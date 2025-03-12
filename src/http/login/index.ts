import { axiosInstance } from '@/http';
import { auth } from '@/model/api/auth';
import { LoginRequest, LoginResponse } from './type';

/**
 * 管理端登錄
 */
export const login = (params: LoginRequest): Promise<string> => {
  return axiosInstance.post(auth.login, params);
};

/**
 * 退出登录
 */
 export const logout = (): Promise<LoginResponse> => {
  return axiosInstance.post(auth.logout);
};

/*
 * @description 获取用户、权限信息
 */
 export const getCurrentUser = (): Promise<{permissionCode: string[]}> => {
  return axiosInstance.get(auth.userInfo);
};
