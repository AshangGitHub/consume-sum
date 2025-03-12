import { HttpResponse, HttpResponseContent } from '@/interface';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AUTH_TOKEN_NAME } from '@/config/index.config';
import { getMessage } from './status';
import { showLoading, hideLoading } from '@/utils/loading';
import { RouterUtil } from '@/utils/router.util';
import { ElMessage } from 'element-plus';
import { OAuthUtils } from '@/utils/oauth/index.util';

/**
 * @description axios請求前攔截器
 */
class axiosBeforeGuard {
  static onFulfilled(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    if (config.headers && (!config.headers.hideLoading as boolean)) {
      showLoading();
    }
    const auth_token = localStorage.getItem(AUTH_TOKEN_NAME);
    if (auth_token) {
      config.headers.Authorization = auth_token;
    }
    return config;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static onRejected(error: any) {
    return Promise.reject(error);
  }
}

/**
 * @description axios請求前攔截器
 */
class axiosAfterGuard {
  static async onFulfilled(
    response: AxiosResponse
  ): Promise<AxiosResponse<HttpResponse | Blob>> {
    hideLoading();
    const res: HttpResponseContent = response.data;
    if (res.code === 200) {
      return Promise.resolve(res.data as AxiosResponse<HttpResponse>);
    } else if (res.code === 301) {
      return Promise.reject(res);
    } else if (res.code === 401) {
      OAuthUtils.logout()
      return Promise.reject(res);
    } else if (res.code === 500) {
      ElMessage.error(res.msg);
      return Promise.reject(res);
    } else {
      ElMessage.error(res.msg);
      return Promise.reject(res);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static onRejected(error: any) {
    hideLoading();
    const { response } = error;
    if (response) {
      getMessage(response.status);
      if (response.status === 500) {
        ElMessage.error(response.data.msg);
      }
      return Promise.reject(response.data);
    } else {
      alert('网络连接异常,请稍后再试!');
    }
  }
}

export { axiosBeforeGuard, axiosAfterGuard };
