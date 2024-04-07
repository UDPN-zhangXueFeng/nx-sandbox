/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 09:39:12
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 16:28:53
 * @Description:
 */
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { persistor, store } from '@/app/core/store/store';
import { Provider } from 'react-redux';
import { router } from '@/app/core/routers/index';
import '@/app/locales/i18.config';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
