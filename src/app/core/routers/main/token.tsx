/*
 * @Author: chenyuting
 * @Date: 2024-05-20 16:25:20
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-20 17:00:02
 * @Description: 
 */
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const TokenRoute: RouteObject = {
  path: 'token',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="token-infomation" />
    },
    {
      path: 'token-infomation',
      element: <Outlet />,
      children: [
        {
          index: true,
          async lazy() {
            const { TokenList } = await import(
              '@/app/views/main-token/token-list'
            );
            return { Component: TokenList };
          }
        },
      ]
    }
  ]
};
