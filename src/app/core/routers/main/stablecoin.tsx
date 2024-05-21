/*
 * @Author: chenyuting
 * @Date: 2024-05-20 16:25:20
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-20 17:00:02
 * @Description: 
 */
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const StablecoinRoute: RouteObject = {
  path: 'stablecoin',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="stablecoin-admin" />
    },
    {
      path: 'stablecoin-admin',
      element: <Outlet />,
      children: [
        {
          index: true,
          async lazy() {
            const { StablecoinList } = await import(
              '@/app/views/main-stablecoin/stablecoin-list'
            );
            return { Component: StablecoinList };
          }
        },
      ]
    }
  ]
};
