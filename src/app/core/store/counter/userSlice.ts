/*
 * @Author: zhangxuefeng
 * @Date: 2024-04-07 13:25:10
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-08 14:53:28
 * @Description: 
 */
import { createReduxFunction } from '@/app/hooks/reduxHook';
import { ut_setLS } from '@bsnbase/utils';
import { createSlice } from '@reduxjs/toolkit';
interface dataType {
  userInfo: any;
  userName: string;
  orgName: string;
  token: string;
  limit: string[];

}
const userSlice = createSlice({
  name: 'information',
  initialState: <dataType>{
    userInfo: '',
    userName:'',
    orgName:'',
    token:'',
    limit:[]
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.userName = action.payload.userName;
      state.orgName = action.payload.orgName;
      state.token = action.payload.token;
      state.limit = action.payload.menuKeyList.map((item:any)=>item.menuKey);
      ut_setLS('token', action.payload.token);
    }
  }
});
export const useThemeReduxFunction = createReduxFunction(userSlice);
export const { setUserInfo } = userSlice.actions;
export const userInfo = (state: any) => state.information.userInfo;
export const userName = (state: any) => state.information.userName;
export const orgName = (state: any) => state.information.orgName;
export const token = (state: any) => state.information.token;
export const limit = (state: any) => state.information.limit;
export default userSlice.reducer;
