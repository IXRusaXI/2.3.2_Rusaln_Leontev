import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CatalogButton from './CatalogButton'

// Мокаем иконку, чтобы не тянуть реальный SVG
vi.mock('./../icons/greenCart.svg', () => ({
  default: 'green-cart-icon.svg',
}))

describe('CatalogButton', () => {
  describe('базовый рендер', () => {
    it('рендерит кнопку с переданным текстом', () => {
      render(<CatalogButton text="Add to cart" />)

      const button = screen.getByRole('button', { name: /Add to cart/i })
      expect(button).toBeInTheDocument()
    })

    it('применяет базовый класс catalog-button', () => {
      const { container } = render(<CatalogButton text="Add to cart" />)

      const button = container.querySelector('button')
      expect(button).not.toBeNull()
      expect(button).toHaveClass('catalog-button')
    })

    it('рендерит иконку корзины внутри кнопки', () => {
      const { container } = render(<CatalogButton text="Add" />)

      const img = container.querySelector('button img')
      expect(img).not.toBeNull()
    })
  })

  describe('обработка onClick', () => {
    it('вызывает переданный onClick при клике по кнопке', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<CatalogButton text="Add to cart" onClick={handleClick} />)

      const button = screen.getByRole('button', { name: /Add to cart/i })
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('не падает, если onClick не передан, и по кнопке кликают', async () => {
      const user = userEvent.setup()

      render(<CatalogButton text="Add to cart" />)

      const button = screen.getByRole('button', { name: /Add to cart/i })
      await user.click(button)

      // Просто убеждаемся, что после клика кнопка всё ещё в DOM,
      // то есть никакой ошибки не произошло
      expect(button).toBeInTheDocument()
    })
  })

  describe('варианты текста', () => {
    it('корректно отображает любой переданный текст', () => {
      render(<CatalogButton text="Buy now" />)

      expect(screen.getByRole('button', { name: /Buy now/i })).toBeInTheDocument()
    })
  })
})