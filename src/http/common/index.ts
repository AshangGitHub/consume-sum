import { axiosInstance } from '@/http';

/**
 * @description 上传图片
 */
export const uploadImage = (file: FormData): Promise<string> => {
  return axiosInstance.post('/file/uploadImg', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};

/**
 * @description 上传文件
 */
export const uploadFile = (file: FormData): Promise<string> => {
  return axiosInstance.post('/file/uploadFile', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};
