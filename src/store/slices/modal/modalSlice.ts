import { createSlice } from '@reduxjs/toolkit'

type ModalState = {
    isCartOpen: boolean
}

const initialState: ModalState = {
    isCartOpen: false
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleCartModal(state) {
        state.isCartOpen = !state.isCartOpen
    }
  },
})

export const modalActions = modalSlice.actions
export default modalSlice.reducer