import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal'
import type { Item } from '../../widgets/Catalog/Catalog'

describe('Modal component', () => {
    it('should render correctly', () => {
        const item: Item = {
            id: 1,
            name: 'Tomato',
            price: 10,
            image: 'https://example.com/image.jpg',
        }

        const list = new Map<Item, number>()
        list.set(item, 3)

        const { getByText } = render(<Modal
            isOpen={true}
            productList={list}
            onRequestClose={() => {}}
            removeFromCart={() => {}}
            updateCart={() => {}}
            totalCount={1}
        />)

        expect(getByText(item.name)).toBeInTheDocument()
        expect(getByText(`$ ${item.price}`)).toBeInTheDocument()
    })

    it('should call onRequestClose when overlay is clicked', () => {
        const onRequestClose = vi.fn()

        const { getByTestId } = render(<Modal
            isOpen={true}
            onRequestClose={onRequestClose}
            removeFromCart={() => {}}
            updateCart={() => {}}
            totalCount={1}
        />)

        const overlay = getByTestId('overlay' )
        fireEvent.click(overlay)
        expect(onRequestClose).toHaveBeenCalledTimes(1)
    })

    it('should call updateCart when plus button is clicked', () => {
        const item: Item = {
            id: 1,
            name: 'Tomato',
            price: 10,
            image: 'https://example.com/image.jpg',
        }

        const list = new Map<Item, number>()
        list.set(item, 3)

        const updateCart = vi.fn()

        const { getByRole } = render(<Modal
            isOpen={true}
            productList={list}
            onRequestClose={() => {}}
            removeFromCart={() => {}}
            updateCart={updateCart}
            totalCount={1}
        />)

        const plusButton = getByRole('button', { name: '+' })

        fireEvent.click(plusButton)

        expect(updateCart).toHaveBeenCalledTimes(1)
        expect(updateCart).toHaveBeenCalledWith(item, 4)
    })

    it('should call removeFromCart when minus button is clicked', () => {
        const item: Item = {
            id: 1,
            name: 'Tomato',
            price: 10,
            image: 'https://example.com/image.jpg',
        }

        const list = new Map<Item, number>()
        list.set(item, 1)

        const removeFromCart = vi.fn()

        const { getByRole } = render(<Modal
            isOpen={true}
            productList={list}
            onRequestClose={() => {}}
            removeFromCart={removeFromCart}
            updateCart={() => {}}
            totalCount={1}
        />)

        const minusButton = getByRole('button', { name: '-' })

        fireEvent.click(minusButton)

        expect(removeFromCart).toHaveBeenCalledTimes(1)
        expect(removeFromCart).toHaveBeenCalledWith(item)
    })

    it('should render correctly when totalCount is 0', () => {
        const { getByText } = render(<Modal
            isOpen={true}
            onRequestClose={() => {}}
            removeFromCart={() => {}}
            updateCart={() => {}}
            totalCount={0}
        />)

        expect(getByText('Your cart is empty')).toBeInTheDocument()
    })
})
