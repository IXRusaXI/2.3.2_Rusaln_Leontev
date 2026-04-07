import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ModalCard from './ModalCard'
import type { Item } from '../../widgets/Catalog/Catalog'

describe('ModalCard component', () => {
    it('should render correctly', () => {
        const item: Item = {
            id: 1,
            name: 'Tomato',
            price: 10,
            image: 'https://example.com/image.jpg',
        }

        const { getByText } = render(<ModalCard
             item={item} 
             bordered={false}
             count={1}
             removeFromCart={() => {}}
             updateCart={() => {}}
            />)

        expect(getByText(item.name)).toBeInTheDocument()
        expect(getByText(`$ ${item.price}`)).toBeInTheDocument()
    })

    it('should call removeFromCart when minus button is clicked then count was 1', () => {
        const item: Item = {
            id: 1,
            name: 'Tomato',
            price: 10,
            image: 'https://example.com/image.jpg',
        }

        const removeFromCart = vi.fn()

        const { getByRole } = render(<ModalCard
            bordered={false}
            count={1}
            updateCart={() => {}}
            item={item} 
            removeFromCart={removeFromCart} 
        />)

        const minusButton = getByRole('button', { name: '-' })

        fireEvent.click(minusButton)

        expect(removeFromCart).toHaveBeenCalledTimes(1)
        expect(removeFromCart).toHaveBeenCalledWith(item)
    })

    it('should call updateCart when plus button is clicked', () => {
        const item: Item = {
            id: 1,
            name: 'Tomato',
            price: 10,
            image: 'https://example.com/image.jpg',
        }

        const updateCart = vi.fn()

        const { getByRole } = render(<ModalCard
            bordered={false}
            count={0}
            removeFromCart={() => {}}
            item={item} 
            updateCart={updateCart} 
        />)

        const plusButton = getByRole('button', { name: '+' })

        fireEvent.click(plusButton)

        expect(updateCart).toHaveBeenCalledTimes(1)
        expect(updateCart).toHaveBeenCalledWith(item, 1)
    })
})
