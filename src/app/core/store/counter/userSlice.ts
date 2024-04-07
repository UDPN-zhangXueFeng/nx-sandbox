/*
 * @Author: zhangxuefeng
 * @Date: 2024-04-07 13:25:10
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 14:32:53
 * @Description: 
 */
import { createReduxFunction } from '@/app/hooks/reduxHook';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'information',
  initialState: {
    userInfo: ''
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    }
  }
});
export const useThemeReduxFunction = createReduxFunction(userSlice);
export const { setUserInfo } = userSlice.actions;
export const userInfo = (state: any) => state.information.userInfo;
export default userSlice.reducer;
