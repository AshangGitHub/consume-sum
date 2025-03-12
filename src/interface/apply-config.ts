import { PageRequest, PageResponse } from '@/interface';

export interface IGetApplyListParams extends PageRequest  {
  clientName: string;
}

export interface IApplyItem {
  clientDesc: string;
  clientId: string;
  clientLogo: string;
  clientName: string;
  clientUrl: string;
  logoutUrl: string;
}

export interface IGetApplyListResponse extends PageResponse {
  records: IApplyItem[];
}

export interface IGeApplyFormParams {
  allowUrl: string;
  clientDesc: string;
  clientId?: string;
  clientLogo: string;
  clientName: string;
  clientUrl: string;
}

export interface IGeApplyDatailResponse {
  allowUrl: string;
  clientDesc: string;
  clientId: string;
  clientLogo: string;
  clientName: string;
  clientUrl: string;
}