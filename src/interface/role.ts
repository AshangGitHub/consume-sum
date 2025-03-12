import { PageResponse } from '@/interface';

export interface IGetRoleParams {
  name: string;
  createDateStart: string;
  createDateEnd: string;
  status: number[];
  pageNum: number;
  pageSize: number;
}

interface IGetRoleItem {
  createBy: number;
  createByName: string;
  createTime: string;
  name: string;
  roleId: number;
  status: number;
  updateBy: string | null;
  updateByName: string | null;
  updateTime: string;
}

export interface IGetRoleListResponse extends PageResponse {
  records: IGetRoleItem[];
}

export interface IGetPermissionsListResponse {
  childPermission?: IGetPermissionsListResponse[];
  clientType: number;
  code: string;
  name: string;
  parentId?: number | null | undefined;
  parentName?: string;
  permissionId: number;
  status: number;
}

export interface IGetRoleFormParams {
  name: string;
  status: number | null;
  roleId: number | undefined;
  permissionList?: number[];
  permissionId?: number[];
  createTime?: '', 
  updateTime?: ''
}

export interface IRole extends IGetRoleItem {
  labCmsIds: string | null;
  labCommonIds: string | null;
  labFssIds: string | null;
  permissionId: string | null;
}

export interface IOrg {
  children?: IOrg[];
  createTime?: string;
  name: string;
  organizationId: number | null;
  parentId?: number | null;
  parentName?: string;
  responsibleBy?: number;
  responsibleName?: string | null;
  status?: number;
}

export interface IAdmin {
  adminId: number;
  createTime: string;
  deptName: string;
  email: string | null;
  invalidDay: string | null;
  lockExpires: string | null;
  passwordExpires: string | null;
  roleList: string[] | null;
  status: number;
  username: string;
}

export interface IGetPermissionsParams {
  parentId: number | null | undefined;
  clientType: number | null;
  name: string;
  code: string;
  status: number | null;
  permissionId?: number | null;
}

