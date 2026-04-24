import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/render'
import Badge from './Badge'

describe('Badge', () => {
  describe('базовый рендер', () => {
    it('отображает переданный текст', () => {
      renderWithProviders(<Badge text="Vegetable" color="white" />)

      expect(screen.getByText('Vegetable')).toBeInTheDocument()
    })

    it('рендерит контейнер с корректными цветами и жирностью для color="green"', () => {
      renderWithProviders(<Badge text="Vegetable" color="green" />)

      const text = screen.getByText('Vegetable')
      const container = text.parentElement
      expect(container).not.toBeNull()

      // проверяем только то, что контролируем сами
      expect(container).toHaveStyle({
        backgroundColor: '#54B46A',
        color: '#ffffff',
        fontWeight: '500',
        borderRadius: '32px',
      })
    })

    it('рендерит контейнер с корректными цветами и жирностью для color="white"', () => {
      renderWithProviders(<Badge text="Vegetable" color="white" />)

      const text = screen.getByText('Vegetable')
      const container = text.parentElement
      expect(container).not.toBeNull()

      expect(container).toHaveStyle({
        backgroundColor: '#F7F7F7',
        color: '#000000',
        fontWeight: '600',
        borderRadius: '32px',
      })
    })
  })

  describe('рендер children', () => {
    it('рендерит переданные children после текста', () => {
      renderWithProviders(
        <Badge text="Vegetable" color="white">
          <span>SHOP</span>
        </Badge>
      )

      const text = screen.getByText('Vegetable')
      const child = screen.getByText('SHOP')

      expect(text).toBeInTheDocument()
      expect(child).toBeInTheDocument()

      const container = text.parentElement
      expect(container?.firstChild).toBe(text)
      expect(container?.lastChild).toBe(child)
    })
  })

  describe('граничные случаи', () => {
    it('корректно рендерит пустую строку в text (контейнер существует)', () => {
      renderWithProviders(<Badge text="" color="white" />)

      // берем контейнер не по тексту, а по роли generic (div/box), он будет один
      const containers = screen.getAllByRole('generic')
      // первый generic в дереве – наш Box
      const container = containers[0]

      expect(container).toBeInTheDocument()
    })

    it('корректно рендерит без children (в контейнере только один Text)', () => {
      renderWithProviders(<Badge text="Only text" color="green" />)

      const text = screen.getByText('Only text')
      const container = text.parentElement

      // в контейнере один дочерний элемент (Text)
      expect(container?.childElementCount).toBe(1)
    })
  })
})