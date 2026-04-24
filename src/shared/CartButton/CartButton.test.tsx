// src/shared/CartButton/CartButton.test.tsx
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import CartButton from './CartButton'

describe('CartButton', () => {
  describe('базовый рендер', () => {
    // Проверяет, что текст из пропса и иконка корзины есть в DOM
    it('отображает текст кнопки и иконку корзины', () => {
      renderWithProviders(<CartButton text="Cart" />)

      expect(screen.getByText('Cart')).toBeInTheDocument()
      expect(screen.getByAltText('Cart')).toBeInTheDocument()
    })

    // Проверяет, что корневой элемент — доступная кнопка
    it('рендерит доступную кнопку (role="button") с правильным именем', () => {
      renderWithProviders(<CartButton text="Cart" />)

      const button = screen.getByRole('button', { name: /cart/i })
      expect(button).toBeInTheDocument()
    })
  })

  describe('индикация количества товаров в корзине', () => {
    // Проверяет, что при пустой корзине счётчик не отображается
    it('не показывает счётчик, когда корзина пуста', () => {
      renderWithProviders(<CartButton text="Cart" />, {
        preloadedState: {
          cart: { cartList: {} },
        } as any,
      })

      const zeroCount = screen.queryByText('0')
      expect(zeroCount).not.toBeInTheDocument()
    })

    // Проверяет, что количество отображаемых товаров соответствует длине cartList
    it('показывает количество уникальных товаров в корзине', () => {
      renderWithProviders(<CartButton text="Cart" />, {
        preloadedState: {
          cart: {
            cartList: {
              '1': { id: 1, name: 'A', price: 10, image: 'a.png' },
              '2': { id: 2, name: 'B', price: 20, image: 'b.png' },
            },
          },
        } as any,
      })

      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })

  describe('поведение onClick', () => {
    // Проверяет, что onClick вызывается при клике по кнопке
    it('вызывает переданный onClick при клике по кнопке', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      renderWithProviders(<CartButton text="Cart" onClick={handleClick} />)

      const button = screen.getByRole('button', { name: /cart/i })
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    // Проверяет, что отсутствие onClick не приводит к ошибке при клике
    it('не падает, если onClick не передан, и по кнопке кликают', async () => {
      const user = userEvent.setup()

      renderWithProviders(<CartButton text="Cart" />)

      const button = screen.getByRole('button', { name: /cart/i })
      await expect(user.click(button)).resolves.not.toThrow()
    })
  })
})