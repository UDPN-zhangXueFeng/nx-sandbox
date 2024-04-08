/*
 * @Author: zhangxuefeng
 * @Date: 2024-04-08 10:21:26
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-08 10:21:33
 * @Description: 
 */
import { createReduxFunction } from '@/app/hooks/reduxHook';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface CommonState {
  /** 用户信息 */
  userInfo: GlobalAny;
  /** 权限 Key List */
  limits: string[];
  /** 列表详情 */
  detailInfo: GlobalAny;
}

const initialState = { userInfo: {}, detailInfo: {} } as CommonState;

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    /** 用户信息 */
    setUserInfo: (state, action: PayloadAction<GlobalAny>): void => {
      state.userInfo = action.payload;
    },
    /** 权限 Key List */
    setLimits: (state, action: PayloadAction<string[]>): void => {
      state.limits = action.payload;
    },
    setDetailInfo: (state, action: PayloadAction<GlobalAny>): void => {
      state.detailInfo = action.payload;
    }
  }
});
export const useCommonReduxFunction = createReduxFunction(commonSlice);
export const { setUserInfo, setLimits, setDetailInfo } = commonSlice.actions;
export default commonSlice.reducer;
