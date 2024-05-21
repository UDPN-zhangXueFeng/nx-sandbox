/*
 * @Author: chenyuting
 * @Date: 2024-05-20 16:25:20
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-20 17:07:39
 * @Description: 
 */
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const AuditRoute: RouteObject = {
  path: 'audit',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="audit-report" />
    },
    {
      path: 'audit-report',
      element: <Outlet />,
      children: [
        {
          index: true,
          async lazy() {
            const { AuditList } = await import(
              '@/app/views/main-audit/audit-list'
            );
            return { Component: AuditList };
          }
        },
      ]
    }
  ]
};
