import { axiosInstance } from "@/http";
import { oauth } from "@/model/api/oauth";
import { LoginResponse } from "./type";

/**
 * 通过code登录系统
 */
export const loginWithCode = (code: string): Promise<LoginResponse> => {
  return axiosInstance.get(`${oauth.code}?code=${code}`);
};

/**
 * 通过code登录系统
 */
export const logout = (): Promise<boolean> => {
  return axiosInstance.post(oauth.logout);
};
