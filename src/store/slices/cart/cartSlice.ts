import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Item } from '../../store'

type ProductPayload = {
  item: Item
  count: number
}

type CartState = {
  cartList: Record<string, ProductPayload>,
  total: number
}

const initialState: CartState = {
  cartList: {},
  total: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductPayload>) {
        const item = action.payload.item
        const count = action.payload.count
        const id = item.id

        if (state.cartList[id]) {
            const currentCount = state.cartList[id].count

            if (currentCount !== undefined) {
                state.cartList[id] = {item: action.payload.item, count: count + currentCount}
            }
        } else {
            state.cartList[id] = {item: item, count: count}         
        }

        state.total += item.price * count
    },
    incrementProduct(state, action: PayloadAction<Item>) {
        const item = action.payload
        const id = item.id

        if (state.cartList[id]) {
            const currentCount = state.cartList[id].count

            if (currentCount !== undefined) {
                state.cartList[id] = {item: action.payload, count: currentCount + 1}
            } else {
                state.cartList[id] = {item: action.payload, count: 1}
            }
        }

        state.total += action.payload.price
    },
    decrementProduct(state, action: PayloadAction<Item>) {
        const item = action.payload
        const id = item.id
        

        if (state.cartList[id]) {
            const currentCount = state.cartList[id].count

            if (currentCount === 1) {
                delete state.cartList[id]
            } else {
                state.cartList[id] = {item: action.payload, count: currentCount - 1}
            }
        }

        state.total -= action.payload.price
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer