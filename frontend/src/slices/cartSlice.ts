import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems, postChangeCart } from "../api/cartApi";
import { logout } from "./loginSlice";

export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () => {
  return getCartItems()
})

export const postChangeCartAsync = createAsyncThunk('postChangeCartAsync', (param: CartItemRequest) => {
  return postChangeCart(param)
})

const initState: CartItemsArray = { items: [], status: '' }

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItemsAsync.fulfilled, (_state, action) => {
        return { items: Array.isArray(action.payload) ? action.payload : [], status: 'fulfilled' }
      })
      .addCase(getCartItemsAsync.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(getCartItemsAsync.rejected, (state) => {
        state.status = 'rejected'
      })
      .addCase(postChangeCartAsync.fulfilled, (_state, action) => {
        return { items: Array.isArray(action.payload) ? action.payload : [], status: 'fulfilled' }
      })
      .addCase(postChangeCartAsync.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(postChangeCartAsync.rejected, (state) => {
        state.status = 'rejected'
      })
      // 로그아웃하면 장바구니 비우기
      .addCase(logout, () => {
        return { ...initState }
      })
  },
})

export default cartSlice.reducer