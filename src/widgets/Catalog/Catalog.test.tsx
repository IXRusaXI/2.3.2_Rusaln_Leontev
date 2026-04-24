// src/widgets/Catalog/Catalog.test.tsx
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import Catalog from './Catalog'
import type { Item } from '../../store/store'

const makeProduct = (overrides?: Partial<Item>): Item => ({
  id: 1,
  name: 'Tomato - 1kg',
  price: 5,
  image: 'tomato.png',
  ...overrides,
})

describe('Catalog', () => {
  describe('базовый рендер', () => {
    it('отображает заголовок "Catalog"', () => {
      renderWithProviders(<Catalog />)

      const heading = screen.getByRole('heading', { name: /catalog/i })
      expect(heading).toBeInTheDocument()
    })

    it('рендерит контейнеры catalog и catalog__list', () => {
      renderWithProviders(<Catalog />)

      const heading = screen.getByRole('heading', { name: /catalog/i })
      const section = heading.closest('section')
      expect(section).toHaveClass('catalog')

      const list = section?.querySelector('.catalog__list')
      expect(list).not.toBeNull()
    })
  })

  describe('рендер списка товаров', () => {
    it('рендерит Card для каждого товара, если productList не пуст', () => {
      const products: Item[] = [
        makeProduct({ id: 1, name: 'Tomato - 1kg' }),
        makeProduct({ id: 2, name: 'Cucumber - 500g' }),
      ]

      renderWithProviders(<Catalog />, {
        preloadedState: {
          products: {
            productList: products,
          },
        } as any,
      })

      expect(screen.getByText('Tomato')).toBeInTheDocument()
      expect(screen.getByText('Cucumber')).toBeInTheDocument()
    })

    it('не рендерит ни одной Card, если productList = null', () => {
      renderWithProviders(<Catalog />, {
        preloadedState: {
          products: {
            productList: null,
          },
        } as any,
      })

      const heading = screen.getByRole('heading', { name: /catalog/i })
      const section = heading.closest('section')!
      const cards = section.querySelectorAll('.card')
      expect(cards.length).toBe(0)
    })

    it('корректно обрабатывает пустой массив productList', () => {
      renderWithProviders(<Catalog />, {
        preloadedState: {
          products: {
            productList: [],
          },
        } as any,
      })

      const heading = screen.getByRole('heading', { name: /catalog/i })
      const section = heading.closest('section')!
      const cards = section.querySelectorAll('.card')
      expect(cards.length).toBe(0)
    })
  })

  describe('использование Redux state', () => {
    it('читает productList из state.products.productList через useAppSelector', () => {
      const products: Item[] = [makeProduct({ id: 1, name: 'Tomato - 1kg' })]

      renderWithProviders(<Catalog />, {
        preloadedState: {
          products: {
            productList: products,
          },
        } as any,
      })

      expect(screen.getByText('Tomato')).toBeInTheDocument()
    })
  })
})