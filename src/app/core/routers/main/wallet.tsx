/*
 * @Author: chenyuting
 * @Date: 2024-05-20 16:25:20
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-20 16:56:31
 * @Description: 
 */
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const WalletRoute: RouteObject = {
  path: 'wallet',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="wallet-management" />
    },
    {
      path: 'wallet-management',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to="whitelist" />
        },
        {
          path: 'whitelist',
          element: <Outlet />,
          children: [
            {
              index: true,
              async lazy() {
                const { WhitelistList } = await import(
                  '@/app/views/main-wallet/wallet-whitelist/whitelist-list'
                );
                return { Component: WhitelistList };
              }
            },
          ]
        },
        {
            path: 'user',
            element: <Outlet />,
            children: [
              {
                index: true,
                async lazy() {
                  const { UserList } = await import(
                    '@/app/views/main-wallet/wallet-user/user-list'
                  );
                  return { Component: UserList };
                }
              },
              // {
              //   path: 'view',
              //   element: <Outlet />,
              //   children: [
              //     {
              //       index: true,
              //       async lazy() {
              //         const { UserView } = await import(
              //           '@/app/views/main-management/sys-user/user-view/user-view'
              //         );
              //         return { Component: UserView };
              //       }
              //     }
              //   ]
              // },
            ]
          },
      ]
    }
  ]
};
