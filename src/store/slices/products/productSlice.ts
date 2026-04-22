import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from './productThunk'
import type { Item } from '../../store'

type UsersState = {
  productList: Item[] | null
  loading: boolean
  error: string | null
}

const initialState: UsersState = {
  productList: null,
  loading: false,
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.productList = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message ?? action.error.message ?? 'Unknown error'
      })
  },
})

export const productsActions = productsSlice.actions
export default productsSlice.reducer