// src/widgets/Cart/Cart.test.tsx
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import Cart from './Cart'
import type { Item } from '../../store/store'
import * as modalSlice from '../../store/slices/modal/modalSlice'

const makeCartItem = (overrides?: Partial<{ item: Item; count: number }>) => ({
  item: {
    id: 1,
    name: 'Tomato - 1kg',
    price: 5,
    image: 'tomato.png',
  },
  count: 2,
  ...overrides,
})

describe('Cart', () => {
  describe('условный рендер по isOpen', () => {
    // Проверяет, что при isCartOpen = false Cart не рендерит overlay
    it('ничего не рендерит, если модалка закрыта (isCartOpen = false)', () => {
      renderWithProviders(<Cart />, {
        preloadedState: {
          modal: { isCartOpen: false },
          cart: { cartList: {}, total: 0 },
        } as any,
      })

      expect(screen.queryByTestId('overlay')).not.toBeInTheDocument()
    })
  })

  describe('состояние: корзина с товарами', () => {
    const cartState = {
      modal: { isCartOpen: true },
      cart: {
        cartList: {
          '1': makeCartItem({
            item: {
              id: 1,
              name: 'Tomato - 1kg',
              price: 5,
              image: 'tomato.png',
            },
            count: 2,
          }),
          '2': makeCartItem({
            item: {
              id: 2,
              name: 'Cucumber - 500g',
              price: 3,
              image: 'cucumber.png',
            },
            count: 1,
          }),
        },
        total: 13,
      },
    }

    // Проверяет, что при открытой модалке рендерятся overlay и модалка
    it('рендерит оверлей и модальное окно', () => {
      renderWithProviders(<Cart />, {
        preloadedState: cartState as any,
      })

      const overlay = screen.getByTestId('overlay')
      expect(overlay).toBeInTheDocument()

      const modal = overlay.querySelector('.modal')
      expect(modal).not.toBeNull()
    })

    // Проверяет, что для каждого товара создаётся ModalCard
    it('рендерит ModalCard для каждого товара в cartList', () => {
      renderWithProviders(<Cart />, {
        preloadedState: cartState as any,
      })

      const cards = document.querySelectorAll('.modal-card')
      expect(cards.length).toBe(2)
    })

    // Проверяет, что bordered=true у всех карточек, кроме последней
    it('проставляет bordered=true для всех карточек, кроме последней', () => {
      renderWithProviders(<Cart />, {
        preloadedState: cartState as any,
      })

      const wrappers = document.querySelectorAll('.modal-card__info-wrapper')
      expect(wrappers.length).toBe(2)

      expect(wrappers[0]).toHaveAttribute('data-bordered', 'true')
      expect(wrappers[1]).toHaveAttribute('data-bordered', 'false')
    })

    // Проверяет, что отображается блок с Total и правильной суммой
    it('отображает сумму total', () => {
      renderWithProviders(<Cart />, {
        preloadedState: cartState as any,
      })

      expect(screen.getByText('Total:')).toBeInTheDocument()
      expect(screen.getByText('$ 13')).toBeInTheDocument()
    })

    // Проверяет, что при наличии товаров не показывается блок "Your cart is empty"
    it('не отображает блок "Your cart is empty"', () => {
      renderWithProviders(<Cart />, {
        preloadedState: cartState as any,
      })

      const emptyText = screen.queryByText('Your cart is empty')
      expect(emptyText).not.toBeInTheDocument()
    })
  })

  describe('состояние: пустая корзина', () => {
    // Проверяет, что при пустой корзине нет списка товаров и total, но есть сообщение о пустой корзине
    it('не рендерит список товаров и total, но показывает сообщение о пустой корзине', () => {
      renderWithProviders(<Cart />, {
        preloadedState: {
          modal: { isCartOpen: true },
          cart: {
            cartList: {},
            total: 0,
          },
        } as any,
      })

      const cards = document.querySelectorAll('.modal-card')
      expect(cards.length).toBe(0)

      const totalBlock = document.querySelector('.modal__total')
      expect(totalBlock).toBeNull()

      expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    })
  })

  describe('поведение кликов (закрытие по оверлею и stopPropagation)', () => {
    const openedState = {
      modal: { isCartOpen: true },
      cart: {
        cartList: {
          '1': makeCartItem(),
        },
        total: 10,
      },
    }

    // Проверяет, что клик по оверлею диспатчит modalActions.toggleCartModal
    it('по клику на оверлей диспатчит modalActions.toggleCartModal', async () => {
      const user = userEvent.setup()
      const toggleSpy = vi.spyOn(modalSlice.modalActions, 'toggleCartModal')

      renderWithProviders(<Cart />, {
        preloadedState: openedState as any,
      })

      const overlay = screen.getByTestId('overlay')
      await user.click(overlay)

      expect(toggleSpy).toHaveBeenCalledTimes(1)
    })

    // Проверяет, что клик внутри модального окна не диспатчит toggleCartModal (stopPropagation)
    it('клик внутри модального окна не закрывает модалку', async () => {
      const user = userEvent.setup()
      const toggleSpy = vi.spyOn(modalSlice.modalActions, 'toggleCartModal')
      toggleSpy.mockClear()

      renderWithProviders(<Cart />, {
        preloadedState: openedState as any,
      })

      const overlay = screen.getByTestId('overlay')
      const modal = overlay.querySelector('.modal') as HTMLElement

      await user.click(modal)

      expect(toggleSpy).not.toHaveBeenCalled()
    })
  })
})