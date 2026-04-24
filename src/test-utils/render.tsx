// src/test-utils/render.tsx
import { type ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { store as appStore, type RootState } from '../store/store'
import modalReducer from '../store/slices/modal/modalSlice'
import cartReducer from '../store/slices/cart/cartSlice'
import productReducer from '../store/slices/products/productSlice'

type PreloadedState = Partial<RootState>

interface RenderWithProvidersOptions {
  preloadedState?: PreloadedState
  store?: typeof appStore
  renderOptions?: Parameters<typeof rtlRender>[1]
}

export function renderWithProviders(
  ui: ReactNode,
  { preloadedState, store, renderOptions }: RenderWithProvidersOptions = {}
) {
  const testStore =
    store ??
    configureStore({
      reducer: {
        modal: modalReducer,
        cart: cartReducer,
        products: productReducer,
      },
      preloadedState: preloadedState as RootState | undefined,
    })

  const Wrapper = ({ children }: { children?: ReactNode }) => (
    <MantineProvider>
      <Provider store={testStore}>{children}</Provider>
    </MantineProvider>
  )

  return {
    store: testStore,
    ...rtlRender(ui, { wrapper: Wrapper, ...(renderOptions ?? {}) }),
  }
}