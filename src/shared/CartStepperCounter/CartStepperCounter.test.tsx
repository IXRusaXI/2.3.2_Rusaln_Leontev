// src/shared/CartStepperCounter/CartStepperCounter.test.tsx
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import CartStepperCounter from './CartStepperCounter'
import type { Item } from '../../store/store'
import * as cartSlice from '../../store/slices/cart/cartSlice'

const mockProduct: Item = {
  id: 1,
  name: 'Test product',
  price: 10,
  image: 'test.png',
}

describe('CartStepperCounter', () => {
  describe('базовый рендер', () => {
    // Проверяет, что отображается текущее значение count
    it('отображает текущее значение count', () => {
      renderWithProviders(
        <CartStepperCounter product={mockProduct} count={3} />
      )

      expect(screen.getByText('3')).toBeInTheDocument()
    })

    // Проверяет, что рендерятся две кнопки "-" и "+"
    it('рендерит две кнопки: "-" и "+"', () => {
      renderWithProviders(
        <CartStepperCounter product={mockProduct} count={1} />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
      expect(screen.getByText('-')).toBeInTheDocument()
      expect(screen.getByText('+')).toBeInTheDocument()
    })
  })

  describe('инкремент товара', () => {
    // Проверяет, что при клике по "+" вызывается cartActions.incrementProduct с product
    it('вызывает cartActions.incrementProduct с продуктом при клике по "+"', async () => {
      const user = userEvent.setup()

      const incrementSpy = vi.spyOn(cartSlice.cartActions, 'incrementProduct')

      renderWithProviders(
        <CartStepperCounter product={mockProduct} count={2} />
      )

      const buttons = screen.getAllByRole('button')
      const incrementButton = buttons[1]

      await user.click(incrementButton)

      expect(incrementSpy).toHaveBeenCalledWith(mockProduct)
    })
  })

  describe('декремент товара', () => {
    // Проверяет, что при клике по "-" вызывается cartActions.decrementProduct с product
    it('вызывает cartActions.decrementProduct с продуктом при клике по "-"', async () => {
      const user = userEvent.setup()

      const decrementSpy = vi.spyOn(cartSlice.cartActions, 'decrementProduct')

      renderWithProviders(
        <CartStepperCounter product={mockProduct} count={2} />
      )

      const buttons = screen.getAllByRole('button')
      const decrementButton = buttons[0]

      await user.click(decrementButton)

      expect(decrementSpy).toHaveBeenCalledWith(mockProduct)
    })
  })
})