import { PageResponse } from '@/interface';

export interface IGetOrganizationeFromParams {
    adminId: number;
    name: string;
    organizationId?: number;
    parentId: number;
    status: number;
}

// interface IGetRoleItem {
//   createBy: number;
//   createByName: string;
//   createTime: string;
//   name: string;
//   roleId: number;
//   status: number;
//   updateBy: string | null;
//   updateByName: string | null;
//   updateTime: string;
// }

// export interface IGetRoleListResponse extends PageResponse {
//   records: IGetRoleItem[];
// }
