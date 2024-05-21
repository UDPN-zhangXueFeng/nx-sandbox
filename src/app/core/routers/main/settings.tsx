/*
 * @Author: chenyuting
 * @Date: 2024-05-20 16:25:20
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-20 17:17:07
 * @Description: 
 */
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const SettingsRoute: RouteObject = {
  path: 'settings',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="system-settings" />
    },
    {
      path: 'system-settings',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to="node" />
        },
        {
          path: 'node',
          element: <Outlet />,
          children: [
            {
              index: true,
              async lazy() {
                const { NodeList } = await import(
                  '@/app/views/main-settings/settings-node/node-list'
                );
                return { Component: NodeList };
              }
            },
          ]
        },
        {
            path: 'workflow',
            element: <Outlet />,
            children: [
              {
                index: true,
                async lazy() {
                  const { WorkflowList } = await import(
                    '@/app/views/main-settings/settings-workflow/workflow-list'
                  );
                  return { Component: WorkflowList };
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
        {
            path: 'contract',
            element: <Outlet />,
            children: [
              {
                index: true,
                async lazy() {
                  const { ContractList } = await import(
                    '@/app/views/main-settings/settings-contract/contract-list'
                  );
                  return { Component: ContractList };
                }
              },
            ]
          },
      ]
    }
  ]
};
