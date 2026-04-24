import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/products/productSlice'
import modalReducer from './slices/modal/modalSlice'
import cartReducer from './slices/cart/cartSlice'

export interface Item {
    id: number,
    name: string,
    price: number,
    image: string,
}

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    cart: cartReducer,
    products: productReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch