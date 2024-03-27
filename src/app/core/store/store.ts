/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 10:47:53
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-03-27 11:23:43
 * @Description: 
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import counterReducer  from './counter/couterSlice';
import {configureStore} from '@reduxjs/toolkit';
const store =  configureStore({
  reducer: {
    counter:counterReducer
  },
});

export type IRootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

export default store