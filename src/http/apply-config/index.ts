import { axiosInstance } from '@/http';
import {
  IGeApplyDatailResponse,
  IGeApplyFormParams,
  IGetApplyListParams,
  IGetApplyListResponse,
} from '@/interface/apply-config';
import { apply } from '@/model/api/apply-config';

/**
 * @description 查询应用列表
 */
export const getApplyConfigList = (
  params: IGetApplyListParams
): Promise<IGetApplyListResponse> => {
  return axiosInstance.post(apply.list, params);
};

/**
 * @description 查询应用详情
 */
export const getApplyConfigDetail = (
  id: string
): Promise<IGeApplyDatailResponse> => {
  return axiosInstance.get(`${apply.detail}/${id}`);
};

/**
 * @description 保存应用
 */
export const saveApplyConfig = (
  params: IGeApplyFormParams
) => {
  return axiosInstance.post(apply.save, params);
};

/**
 * @description 编辑应用
 */
export const editApplyConfig = (
  params: IGeApplyFormParams
) => {
  return axiosInstance.put(apply.edit, params);
};