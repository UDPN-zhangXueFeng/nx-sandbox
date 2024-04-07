/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 13:44:13
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 15:46:05
 * @Description:
 */
import ErrorPage from '@/app/views/error/errorPage';
import { RouteObject } from 'react-router-dom';
import DashboardRoute from './main/dashboard';
import CustomLayout from '../components/layout/CustomLayout';

export const MainRoute: RouteObject = {
  path: 'main',
  element: <CustomLayout />,
  errorElement: <ErrorPage />,
  children: [DashboardRoute]
};
