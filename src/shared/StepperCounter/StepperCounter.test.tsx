// src/shared/StepperCounter/StepperCounter.test.tsx
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import StepperCounter from './StepperCounter'

describe('StepperCounter', () => {
  describe('базовый рендер', () => {
    // Проверяет, что текущее значение счётчика отображается
    it('отображает текущее значение count', () => {
      renderWithProviders(
        <StepperCounter count={5} updateCount={vi.fn()} />
      )

      expect(screen.getByText('5')).toBeInTheDocument()
    })

    // Проверяет, что рендерятся две кнопки управления
    it('рендерит две кнопки: для уменьшения и увеличения значения', () => {
      renderWithProviders(
        <StepperCounter count={1} updateCount={vi.fn()} />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
    })
  })

  describe('инкремент', () => {
    // Проверяет, что при клике по "+" вызывается updateCount с count + 1
    it('вызывает updateCount с count + 1 при клике по кнопке "+"', async () => {
      const user = userEvent.setup()
      const updateCount = vi.fn()
      const initialCount = 2

      renderWithProviders(
        <StepperCounter count={initialCount} updateCount={updateCount} />
      )

      const buttons = screen.getAllByRole('button')
      const incrementButton = buttons[1]

      await user.click(incrementButton)

      expect(updateCount).toHaveBeenCalledWith(initialCount + 1)
    })
  })

  describe('декремент', () => {
    // Проверяет, что при count > 0 клик по "-" вызывает updateCount с count - 1
    it('вызывает updateCount с count - 1 при клике по кнопке "-" и count > 0', async () => {
      const user = userEvent.setup()
      const updateCount = vi.fn()
      const initialCount = 3

      renderWithProviders(
        <StepperCounter count={initialCount} updateCount={updateCount} />
      )

      const buttons = screen.getAllByRole('button')
      const decrementButton = buttons[0]

      await user.click(decrementButton)

      expect(updateCount).toHaveBeenCalledWith(initialCount - 1)
    })

    // Проверяет, что при count = 0 клик по "-" не вызывает updateCount
    it('не вызывает updateCount, если текущее значение равно 0', async () => {
      const user = userEvent.setup()
      const updateCount = vi.fn()

      renderWithProviders(
        <StepperCounter count={0} updateCount={updateCount} />
      )

      const buttons = screen.getAllByRole('button')
      const decrementButton = buttons[0]

      await user.click(decrementButton)

      expect(updateCount).not.toHaveBeenCalled()
    })
  })
})