// src/widgets/Card/Card.test.tsx
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import Card from './Card'
import type { Item } from '../../store/store'
import * as cartSlice from '../../store/slices/cart/cartSlice'

const baseItem: Item = {
  id: 1,
  name: 'Tomato - 1kg',
  price: 5,
  image: 'tomato.png',
}

describe('Card', () => {
  describe('базовый рендер', () => {
    // Проверяет, что отображаются картинка, title, weight и цена
    it('отображает картинку, название (title), weight и цену', () => {
      renderWithProviders(<Card item={baseItem} />)

      const [title, weight] = baseItem.name.split(' - ')

      const image = screen.getByAltText(title)
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', baseItem.image)

      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByText(weight)).toBeInTheDocument()
      expect(screen.getByText(`$ ${baseItem.price}`)).toBeInTheDocument()
    })

    // Проверяет, что рендерится кнопка "Add to cart"
    it('рендерит кнопку "Add to cart"', () => {
      renderWithProviders(<Card item={baseItem} />)

      const button = screen.getByRole('button', { name: /add to cart/i })
      expect(button).toBeInTheDocument()
    })

    // Проверяет, что StepperCounter изначально показывает 0
    it('рендерит StepperCounter с начальным значением 0', () => {
      renderWithProviders(<Card item={baseItem} />)

      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  describe('интеграция со StepperCounter (локальный count)', () => {
    // Проверяет, что при клике по "+" локальный count увеличивается
    it('увеличивает локальный count при инкременте StepperCounter', async () => {
      const user = userEvent.setup()
      renderWithProviders(<Card item={baseItem} />)

      const buttons = screen.getAllByRole('button')
      // Внутри Card несколько кнопок (StepperCounter, Add to cart),
      // поэтому ищем именно кнопку с текстом "+"
      const incrementButton = screen.getByText('+')
      await user.click(incrementButton)

      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })

  describe('логика добавления в корзину', () => {
    // Проверяет, что при count = 0 клик по "Add to cart" не вызывает addProduct
    it('не диспатчит addProduct, если count равен 0', async () => {
      const user = userEvent.setup()
      const addProductSpy = vi.spyOn(cartSlice.cartActions, 'addProduct')

      renderWithProviders(<Card item={baseItem} />)

      const addToCartButton = screen.getByRole('button', {
        name: /add to cart/i,
      })

      await user.click(addToCartButton)

      expect(addProductSpy).not.toHaveBeenCalled()
    })

    // Проверяет, что при count > 0 клик по "Add to cart" диспатчит addProduct с item и count
    it('диспатчит addProduct с item и текущим count, если count > 0', async () => {
      const user = userEvent.setup()
      const addProductSpy = vi.spyOn(cartSlice.cartActions, 'addProduct')

      renderWithProviders(<Card item={baseItem} />)

      // Увеличиваем count до 2 через StepperCounter
      const incrementButton = screen.getByText('+')
      await user.click(incrementButton)
      await user.click(incrementButton)

      // Кликаем по "Add to cart"
      const addToCartButton = screen.getByRole('button', {
        name: /add to cart/i,
      })
      await user.click(addToCartButton)

      expect(addProductSpy).toHaveBeenCalledWith({
        item: baseItem,
        count: 2,
      })
    })
  })
})