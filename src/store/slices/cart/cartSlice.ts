import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Item } from '../../store'

type AddProductPayload = {
  item: Item
  count: number
}

type CartState = {
  cartList: Map<Item, number>,
  total: number
}

const initialState: CartState = {
  cartList: new Map<Item, number>(),
  total: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<AddProductPayload>) {
        if (state.cartList.has(action.payload.item)) {
            const count = state.cartList.get(action.payload.item)
            if (count !== undefined) {
                state.cartList.set(action.payload.item, count + action.payload.count)
            }
        } else {
            state.cartList.set(action.payload.item, action.payload.count)         
        }
    },
    incrementProduct(state, action: PayloadAction<Item>) {
        const currentCount = state.cartList.get(action.payload)
        
        if (currentCount !== undefined) {
            state.cartList.set(action.payload, currentCount + 1)
        } else {
            state.cartList.set(action.payload, 1)
        }

        state.total += action.payload.price
    },
    decrementProduct(state, action: PayloadAction<Item>) {
        const currentCount = state.cartList.get(action.payload)

        if (currentCount !== undefined) {
            if (currentCount === 1) {
            state.cartList.delete(action.payload)
            } else {
            state.cartList.set(action.payload, currentCount - 1)
            }
        }

        state.total -= action.payload.price
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer