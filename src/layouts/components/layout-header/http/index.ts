import { axiosInstance } from '@/http';

// 登出
export const logout = (): Promise<boolean> => {
  return axiosInstance.get('/oauth2/quit', {
    baseURL: '/api/auth',
  });
};
