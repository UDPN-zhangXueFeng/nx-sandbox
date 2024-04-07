/*
 * @Author: zhangxuefeng
 * @Date: 2024-04-07 13:33:23
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 13:33:28
 * @Description:
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Slice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../core/store/store';
// import type { RootState, AppDispatch } from '../store';

type GetArrFirst<T> = T extends [infer Res] ? Res : unknown;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const createReduxFunction = <S extends Slice>(slice: S) => {
  return <T extends keyof S['actions']>(name: T) => {
    const dispatch = useAppDispatch();
    const actionCreator = (slice.actions as S['actions'])[name];
    return (payload: GetArrFirst<Parameters<typeof actionCreator>>) => {
      dispatch(actionCreator(payload));
    };
  };
};
