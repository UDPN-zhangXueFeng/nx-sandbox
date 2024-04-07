/*
 * @Author: zhangxuefeng
 * @Date: 2024-04-07 13:25:10
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 16:44:08
 * @Description: 
 */
import { createReduxFunction } from '@/app/hooks/reduxHook';
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: {
      token: {
        colorPrimary: '#077ff5',
        colorBgContainer:'#ffffff'
      }
    }
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    }
  }
});
export const useThemeReduxFunction = createReduxFunction(themeSlice);
export const { setTheme } = themeSlice.actions;
export const themeToken = (state: any) => state.theme;
export default themeSlice.reducer;
