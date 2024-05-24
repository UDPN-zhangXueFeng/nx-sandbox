/*
 * @Author: chenyuting
 * @Date: 2024-05-20 16:25:20
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-20 17:00:02
 * @Description: 
 */
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const TransactionRoute: RouteObject = {
  path: 'transaction',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="transaction-records" />
    },
    {
      path: 'transaction-records',
      element: <Outlet />,
      children: [
        {
          index: true,
          async lazy() {
            const { TransactionList } = await import(
              '@/app/views/main-transaction/transaction-list'
            );
            return { Component: TransactionList };
          }
        },
      ]
    }
  ]
};
