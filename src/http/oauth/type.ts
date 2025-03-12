import { HttpResponse } from "@/interface";

/**
 * @description 登錄接口返回值
 */
export interface LoginResponse extends HttpResponse {
  labFssAdminToken: string;
  adminId: number;
  createTime: string;
  deptId: number;
  deptName: string;
  email: string;
  permissionCode: string[];
  platforms?: string;
  roleList: [];
  status: 0 | 1;
  access_token: string;
  username: string;
}
