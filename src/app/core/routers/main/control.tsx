/*
 * @Author: chenyuting
 * @Date: 2024-05-20 16:25:20
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-20 17:05:10
 * @Description: 
 */
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const ControlRoute: RouteObject = {
  path: 'control',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="control-monitoring" />
    },
    {
      path: 'control-monitoring',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to="rule" />
        },
        {
          path: 'rule',
          element: <Outlet />,
          children: [
            {
              index: true,
              async lazy() {
                const { RuleList } = await import(
                  '@/app/views/main-control/control-rule/rule-list'
                );
                return { Component: RuleList };
              }
            },
          ]
        },
        {
            path: 'suspicious',
            element: <Outlet />,
            children: [
              {
                index: true,
                async lazy() {
                  const { SuspiciousList } = await import(
                    '@/app/views/main-control/control-suspicious/suspicious-list'
                  );
                  return { Component: SuspiciousList };
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
