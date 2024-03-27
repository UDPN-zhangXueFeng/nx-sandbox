/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 13:44:13
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-03-27 13:54:04
 * @Description:
 */
import Login from '@/app/views/login/login';
import { RouteObject } from 'react-router-dom';

export const HomeRoute: RouteObject = {
  path: '/',
  element: <Login />
};
