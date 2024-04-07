/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-06 13:26:22
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 13:40:02
 * @Description:
 */
import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeSlice from './counter/themeSlice';
import userSlice from './counter/userSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// 定义持久化配置
const persistConfig = {
  key: 'root',
  storage
};

const reducer = combineReducers({
  // commonSlice,
  themeSlice,
  userSlice
});

// 创建持久化Reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// 创建Redux存储
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// 创建持久化存储
const persistor = persistStore(store);

export { store, persistor };
