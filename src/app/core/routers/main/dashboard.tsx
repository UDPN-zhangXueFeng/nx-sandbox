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
            const { CtrDsb } = await import(
              '@/app/views/main-dashboard/ctr-dsb/ctr-dsb'
            );
            return { Component: CtrDsb };
          }
        }
      ]
    },
    {
      path: 'mdashboard',
      element: <Outlet />,
      children: [
        {
          index: true,
          async lazy() {
            const { CciDsb } = await import(
              '@/app/views/main-dashboard/cci-dsb/cci-dsb'
            );
            return { Component: CciDsb };
          }
        }
      ]
    },
    {
      path: 'mTodoList',
      element: <Outlet />,
      children: [
        {
          index: true,
          async lazy() {
            const { CtrTodo } = await import(
              '@/app/views/main-dashboard/ctr-todo/ctr-todo'
            );
            return { Component: CtrTodo };
          }
        }
      ]
    },
    {
      path: 'todoList',
      element: <Outlet />,
      children: [
        {
          index: true,
          async lazy() {
            const { CciTodo } = await import(
              '@/app/views/main-dashboard/cci-todo/cci-todo'
            );
            return { Component: CciTodo };
          }
        }
      ]
    }
  ]
};

export default DashboardRoute;
