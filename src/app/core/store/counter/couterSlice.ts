/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 10:56:56
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-03-27 11:11:25
 * @Description: 
 */
import { createSlice } from "@reduxjs/toolkit"
export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: {
        increment: (state) => {
            console.log(state.count)
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        }
    }
});
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;