/*
 * @Author: zhangxuefeng
 * @Date: 2024-04-07 13:25:10
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-05-09 11:02:37
 * @Description:
 */
import { createReduxFunction } from '@/app/hooks/reduxHook';
import { ut_setLS } from '@bsnbase/utils';
import { createSlice } from '@reduxjs/toolkit';
interface dataType {
  userInfo: GlobalAny;
  userName: string;
  orgName: string;
  token: string;
  limit: GlobalAny[];
}
const userSlice = createSlice({
  name: 'information',
  initialState: <dataType>{
    userInfo: '',
    userName: '',
    orgName: '',
    token: '',
    limit: []
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.userName = action.payload.userName;
      state.orgName = action.payload.orgName;
      state.token = action.payload.token;
      state.limit = action.payload.menuKeyList.map(
        (item: GlobalAny) => item.menuId
      );
      ut_setLS('token', action.payload.token);
    }
  }
});
export const useThemeReduxFunction = createReduxFunction(userSlice);
export const { setUserInfo } = userSlice.actions;
export const userInfo = (state: GlobalAny) => state.information.userInfo;
export const userName = (state: GlobalAny) => state.information.userName;
export const orgName = (state: GlobalAny) => state.information.orgName;
export const token = (state: GlobalAny) => state.information.token;
export const limit = (state: GlobalAny) => state.information.limit;
export default userSlice.reducer;
