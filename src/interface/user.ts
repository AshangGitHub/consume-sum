import { PageResponse } from '@/interface';

export interface IGetUserParams {
  userName?: string;
  createDateStart: string;
  createDateEnd: string;
  status: number[];
  pageNum: number;
  pageSize: number;
}

interface IGetUserItem {
  adminId: number;
  createTime: string;
  deptName: string;
  email: string;
  roleList: {
    roleId: number;
    name: string;
  }[];
  name: string;
  roleId: number;
  status: 0 | 1;
  username: string;
}

export interface IGetUserListResponse extends PageResponse {
  records: IGetUserItem[];
}

export interface IAddUserParams {
  deptId: number;
  email: string;
  password: string;
  roleIds: number[];
  username: string;
}


export interface IGetUserDetail {
  adminId: number | null; 
  createTime: string;
  deptId: number | null;
  deptName: string;
  email: string;
  roleList: {
    roleId: number;
    name: string;
  }[];
  username: string;
  status: number | null;
}

export interface IGetUserFormParams {
  id?: number | null; 
  deptId: {
    id: number | null;
    name: string;
  };
  username: string;
  password: string;
  email: string;
  roleIds: number[];
}

export interface IGetUserAddAndEditParams {
  id?: number | null; 
  deptId: number | null;
  username: string;
  password: string | null;
  email: string;
  roleIds: number[];
}