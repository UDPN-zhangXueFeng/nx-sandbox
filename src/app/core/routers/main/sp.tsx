/*
 * @Author: chenyuting
 * @Date: 2024-05-20 16:25:20
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-20 16:28:48
 * @Description: 
 */
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const SpRoute: RouteObject = {
  path: 'sp',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="sp-management" />
    },
    {
      path: 'sp-management',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to="onboarding" />
        },
        {
          path: 'onboarding',
          element: <Outlet />,
          children: [
            {
              index: true,
              async lazy() {
                const { OnboardingList } = await import(
                  '@/app/views/main-sp/sp-onboarding/onboarding-list'
                );
                return { Component: OnboardingList };
              }
            },
          ]
        },
        {
            path: 'sp',
            element: <Outlet />,
            children: [
              {
                index: true,
                async lazy() {
                  const { SpList } = await import(
                    '@/app/views/main-sp/sp-management/sp-list'
                  );
                  return { Component: SpList };
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
