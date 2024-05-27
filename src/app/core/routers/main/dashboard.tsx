/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-04 11:10:40
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 15:02:14
 * @Description:
 */

import { Navigate, Outlet, RouteObject } from 'react-router-dom';

const DashboardRoute: RouteObject = {
  path: 'dashboard',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="dashboard" />
    },
    {
      path: 'dashboard',
      element: <Outlet />,
      children: [
        {
          index: true,
          async lazy() {
            const { Dashboard } = await import(
              '@/app/views/main-dashboard/dashboard'
            );
            return { Component: Dashboard };
          }
        }
      ]
    }
  ]
};

export default DashboardRoute;
