/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-04 11:10:40
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-27 11:10:33
 * @Description:
 */

import { Navigate, Outlet, RouteObject } from 'react-router-dom';

const ToDoRoute: RouteObject = {
  path: 'todo',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="todo-list" />
    },
    {
      path: 'todo-list',
      element: <Outlet />,
      children: [
        {
          index: true,
          async lazy() {
            const { TodoList } = await import(
              '@/app/views/main-todo/todo-list'
            );
            return { Component: TodoList };
          }
        }
      ]
    }
  ]
};

export default ToDoRoute;
