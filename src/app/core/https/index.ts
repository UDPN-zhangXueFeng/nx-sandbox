/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-29 11:19:57
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 14:30:11
 * @Description: 
 */
import axios from 'axios';

const whitelist: any[] = [
  '/api/rbac/v1/login',
  '/api/rbac/v1/code/getCode'
];

const instance = axios.create({
  baseURL: '/api',
  timeout: 120 * 1000,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
    'x-requested-with': 'XMLHttpRequest',
    'x-frame-options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    token: ''
  }
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    console.log(response);
    if(response.status ===  200 && !whitelist.includes(response.config.url)){
      if(response.data.code !== 0){
        return Promise.reject(response.data.message);
      }
    }
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export const request = instance;
