/**
 * @description: OAuth相关工具类
 */
interface QueryParams {
  [key: string]: string | number | boolean;
}
export class ToolUtils {
  // 生成OAuth登录URL
  static buildUrl(config: {
    domain: string,
    path?: string,
    queryParams?: QueryParams
  }): string {
    const url = new URL(config.path || '', config.domain);
    if (config.queryParams) {
      Object.entries(config.queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }
    return url.toString();
  }
}
