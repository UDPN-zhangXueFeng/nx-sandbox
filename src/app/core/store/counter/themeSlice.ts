/*
 * @Author: zhangxuefeng
 * @Date: 2024-04-07 13:25:10
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-20 13:43:32
 * @Description:
 */
import { createReduxFunction } from '@/app/hooks/reduxHook';
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: {
      token: {
        colorPrimary: '#63A1D0',
        colorBgContainer: '#fff'
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
export const themeToken = (state: GlobalAny) => state.theme;
export default themeSlice.reducer;
