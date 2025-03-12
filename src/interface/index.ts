/**
 * @description 公共interface
 */

// 接口返回内容
interface HttpResponseContent {
  code: number;
  data?: unknown;
  [key: string]: unknown;
  msg: string;
}

// 接口返回值通用
interface HttpResponse {
  status: number;
  statusText: string;
  data: HttpResponseContent | unknown;
}

interface Tree {
  label: string;
  children?: Tree[];
}

//分页请求参数通用
interface PageRequest {
  pageNum: number;
  pageSize: number;
  sortBy?: string[];
  sortField?: string[];
}
//分页返回体通用
interface PageResponse {
  current: number;
  hitCount?: boolean;
  orders?: [{ asc: boolean; column: string }];
  pages?: number;
  searchCount?: boolean;
  size?: number;
  total: number;
}

export type {
  Tree,
  HttpResponse,
  HttpResponseContent,
  PageRequest,
  PageResponse,
};
