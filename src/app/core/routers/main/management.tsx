import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const ManagementRoute: RouteObject = {
  path: 'management',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="system-management" />
    },
    {
      path: 'system-management',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to="user" />
        },

        {
          path: 'user',
          element: <Outlet />,
          children: [
            {
              index: true,
              async lazy() {
                const { SysUser } = await import(
                  '@/app/views/main-management/sys-user/user-list/sys-user'
                );
                return { Component: SysUser };
              }
            },
            {
              path: 'view',
              element: <Outlet />,
              children: [
                {
                  index: true,
                  async lazy() {
                    const { UserView } = await import(
                      '@/app/views/main-management/sys-user/user-view/user-view'
                    );
                    return { Component: UserView };
                  }
                }
              ]
            },
            {
              path: 'edit',
              element: <Outlet />,
              children: [
                {
                  index: true,
                  async lazy() {
                    const { UserEdit } = await import(
                      '@/app/views/main-management/sys-user/user-edit/user-edit'
                    );
                    return { Component: UserEdit };
                  }
                }
              ]
            }
          ]
        },
        {
          path: 'role',
          element: <Outlet />,
          children: [
            {
              index: true,
              async lazy() {
                const { SysRole } = await import(
                  '@/app/views/main-management/sys-role/role-list/sys-role'
                );
                return { Component: SysRole };
              }
            },
            {
              path: 'view',
              element: <Outlet />,
              children: [
                {
                  index: true,
                  async lazy() {
                    const { RoleView } = await import(
                      '@/app/views/main-management/sys-role/role-view/role-view'
                    );
                    return { Component: RoleView };
                  }
                }
              ]
            },
            {
              path: 'edit',
              element: <Outlet />,
              children: [
                {
                  index: true,
                  async lazy() {
                    const { RoleEdit } = await import(
                      '@/app/views/main-management/sys-role/role-edit/role-edit'
                    );
                    return { Component: RoleEdit };
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
