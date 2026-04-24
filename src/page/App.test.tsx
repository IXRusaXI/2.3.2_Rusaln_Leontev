// src/page/App.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../test-utils/render'
import App from './App'
import * as productsThunk from '../store/slices/products/productThunk'

describe('App', () => {
  describe('базовый рендер', () => {
    // Проверяет, что рендерятся Header, Catalog и Cart внутри корневого контейнера
    it('рендерит Header, Catalog и Cart внутри корневого контейнера', () => {
      renderWithProviders(<App />)

      const root = screen.getByTestId('app-root')
      expect(root).toBeInTheDocument()

      // Header как <header> → role="banner"
      expect(screen.getByRole('banner')).toBeInTheDocument()

      // Catalog по заголовку
      expect(
        screen.getByRole('heading', { name: /catalog/i })
      ).toBeInTheDocument()
    })
  })

  describe('поведение useEffect при маунте', () => {
    // Проверяет, что при первом рендере вызывается fetchProducts один раз
    it('вызывает dispatch(fetchProducts()) один раз при первом рендере', () => {
      const fetchProductsSpy = vi.spyOn(productsThunk, 'fetchProducts')

      renderWithProviders(<App />)

      expect(fetchProductsSpy).toHaveBeenCalledTimes(1)
    })
  })
})