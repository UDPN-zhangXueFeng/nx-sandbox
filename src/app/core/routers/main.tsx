/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 13:44:13
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 17:30:53
 * @Description:
 */
import ErrorPage from '@/app/views/error/errorPage';
import { RouteObject } from 'react-router-dom';
import DashboardRoute from './main/dashboard';
import CustomLayout from '../components/layout/CustomLayout';
import { ManagementRoute } from './main/management';

export const MainRoute: RouteObject = {
  path: 'main',
  element: <CustomLayout />,
  errorElement: <ErrorPage />,
  children: [DashboardRoute, ManagementRoute]
};
