// src/shared/ModalCard/ModalCard.test.tsx
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import ModalCard from './ModalCard'
import type { Item } from '../../store/store'

const mockItem: Item = {
  id: 1,
  name: 'Tomato',
  price: 5,
  image: 'tomato.png',
}

describe('ModalCard', () => {
  describe('базовый рендер', () => {
    // Проверяет, что отображаются картинка, имя и цена товара
    it('отображает картинку, имя и цену товара', () => {
      renderWithProviders(
        <ModalCard item={mockItem} bordered={false} count={2} />
      )

      const image = screen.getByAltText(mockItem.name)
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', mockItem.image)

      expect(screen.getByText(mockItem.name)).toBeInTheDocument()
      expect(screen.getByText(`$ ${mockItem.price}`)).toBeInTheDocument()
    })

    // Проверяет, что рендерится CartStepperCounter с переданным count
    it('рендерит CartStepperCounter с переданным count', () => {
      renderWithProviders(
        <ModalCard item={mockItem} bordered={false} count={3} />
      )

      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })

  describe('оформление (bordered)', () => {
    // Проверяет, что при bordered = true data-bordered="true" на info-wrapper
    it('проставляет data-bordered="true", когда bordered = true', () => {
      renderWithProviders(
        <ModalCard item={mockItem} bordered={true} count={1} />
      )

      const infoWrapper = screen.getByText(mockItem.name).closest('.modal-card__info-wrapper')
      expect(infoWrapper).toHaveAttribute('data-bordered', 'true')
    })

    // Проверяет, что при bordered = false data-bordered="false" на info-wrapper
    it('проставляет data-bordered="false", когда bordered = false', () => {
      renderWithProviders(
        <ModalCard item={mockItem} bordered={false} count={1} />
      )

      const infoWrapper = screen.getByText(mockItem.name).closest('.modal-card__info-wrapper')
      expect(infoWrapper).toHaveAttribute('data-bordered', 'false')
    })
  })

  describe('поведение клика (stopPropagation)', () => {
    // Проверяет, что клик по корневому контейнеру останавливает всплытие
    it('останавливает всплытие клика по корневому контейнеру', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      renderWithProviders(
        <div onClick={handleClick}>
          <ModalCard item={mockItem} bordered={false} count={1} />
        </div>
      )

      const root = screen.getByAltText(mockItem.name).closest('.modal-card')
      expect(root).not.toBeNull()

      await user.click(root as HTMLElement)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })
})