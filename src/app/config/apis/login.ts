import { request } from '@/app/core/https';

/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-29 11:04:21
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-03-29 11:23:51
 * @Description:
 */
export const captchaApi = () =>
  request.get('/api/rbac/v1/code/getCode', {
    responseType: 'blob'
  });
