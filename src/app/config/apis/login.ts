import { request } from '@/app/core/https';

/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-29 11:04:21
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 13:44:20
 * @Description:
 */
export const captchaApi = () =>
  request.get('/api/rbac/v1/code/getCode', {
    responseType: 'blob'
  });

export const loginApi = (data: any) => {
  const { randomstr, ...other } = data;
  return request.post('/api/rbac/v1/login', other, {
    headers: {
      randomstr: randomstr,
      allData: true
    }
  });
};
