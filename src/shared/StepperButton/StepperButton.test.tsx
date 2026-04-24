// src/shared/StepperButton/StepperButton.test.tsx
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import StepperButton from './StepperButton'

describe('StepperButton', () => {
  describe('базовый рендер', () => {
    // Проверяет, что рендерится доступная кнопка
    it('рендерит кнопку с role="button"', () => {
      renderWithProviders(<StepperButton onClick={() => {}}>+</StepperButton>)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    // Проверяет, что отображаются переданные children
    it('отображает переданные children внутри кнопки', () => {
      renderWithProviders(<StepperButton onClick={() => {}}>+</StepperButton>)

      expect(screen.getByText('+')).toBeInTheDocument()
    })

    // Проверяет, что можно передать произвольный React-узел как children
    it('может отображать любой React-узел как children', () => {
      renderWithProviders(
        <StepperButton onClick={() => {}}>
          <span aria-label="minus">-</span>
        </StepperButton>
      )

      const child = screen.getByLabelText('minus')
      expect(child).toBeInTheDocument()
    })
  })

  describe('поведение onClick', () => {
    // Проверяет, что onClick вызывается при клике по кнопке
    it('вызывает onClick при клике по кнопке', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      renderWithProviders(<StepperButton onClick={handleClick}>+</StepperButton>)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})