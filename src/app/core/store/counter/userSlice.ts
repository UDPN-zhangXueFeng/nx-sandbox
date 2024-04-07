/*
 * @Author: zhangxuefeng
 * @Date: 2024-04-07 13:25:10
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 17:17:57
 * @Description: 
 */
import { createReduxFunction } from '@/app/hooks/reduxHook';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'information',
  initialState: {
    userInfo: '',
    userName:'',
    orgName:''
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.userName = action.payload.userName;
      state.orgName = action.payload.orgName;
    }
  }
});
export const useThemeReduxFunction = createReduxFunction(userSlice);
export const { setUserInfo } = userSlice.actions;
export const userInfo = (state: any) => state.information.userInfo;
export const userName = (state: any) => state.information.userName;
export const orgName = (state: any) => state.information.orgName;
export default userSlice.reducer;
