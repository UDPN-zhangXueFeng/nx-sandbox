/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 09:39:12
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-03-29 14:29:56
 * @Description:
 */
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import store from '@/app/core/store/store';
import { Provider } from 'react-redux';
import { router } from '@/app/core/routers/index';
import '@/app/locales/i18.config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
