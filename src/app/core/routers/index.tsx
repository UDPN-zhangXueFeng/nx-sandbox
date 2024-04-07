/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 13:35:39
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 14:40:45
 * @Description:
 */
import { createBrowserRouter } from 'react-router-dom';
import { HomeRoute } from './home';
import { MainRoute } from './main';

export const router = createBrowserRouter([HomeRoute, MainRoute]);
