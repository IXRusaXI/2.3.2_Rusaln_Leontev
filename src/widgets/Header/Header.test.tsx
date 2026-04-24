// src/widgets/Header/Header.test.tsx
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import Header from './Header'
import * as modalSlice from '../../store/slices/modal/modalSlice'

describe('Header', () => {
  describe('базовый рендер', () => {
    // Проверяет, что рендерится header-контейнер
    it('рендерит header-контейнер', () => {
      renderWithProviders(<Header />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    // Проверяет, что рендерится внешний Badge "Vegetable"
    it('рендерит внешний Badge "Vegetable"', () => {
      renderWithProviders(<Header />)

      expect(screen.getByText('Vegetable')).toBeInTheDocument()
    })

    // Проверяет, что рендерится вложенный Badge "SHOP"
    it('рендерит вложенный Badge "SHOP"', () => {
      renderWithProviders(<Header />)

      expect(screen.getByText('SHOP')).toBeInTheDocument()
    })

    // Проверяет, что рендерится CartButton с текстом "Cart"
    it('рендерит CartButton с текстом "Cart"', () => {
      renderWithProviders(<Header />)

      const cartButton = screen.getByRole('button', { name: /cart/i })
      expect(cartButton).toBeInTheDocument()
    })
  })

  describe('открытие/закрытие корзины', () => {
    // Проверяет, что по клику на CartButton вызывается modalActions.toggleCartModal
    it('по клику на CartButton вызывает modalActions.toggleCartModal', async () => {
      const user = userEvent.setup()
      const toggleSpy = vi.spyOn(modalSlice.modalActions, 'toggleCartModal')

      renderWithProviders(<Header />)

      const cartButton = screen.getByRole('button', { name: /cart/i })
      await user.click(cartButton)

      expect(toggleSpy).toHaveBeenCalledTimes(1)
    })
  })
})