import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Catalog from '../../widgets/Catalog/Catalog'
import type { Item } from '../../widgets/Catalog/Catalog'

describe('Catalog component', () => {
    it('should render correctly', () => {
        const itemList: Item[] = [
            {
                id: 1,
                name: 'Tomato',
                price: 10,
                image: 'https://example.com/image.jpg',
            },
            {
                id: 2,
                name: 'Potato',
                price: 20,
                image: 'https://example.com/image.jpg',
            },
        ]

        const { getByText } = render(<Catalog itemList={itemList} addToCart={() => {}} />)

        itemList.forEach((item) => {
            expect(getByText(item.name)).toBeInTheDocument()
            expect(getByText(`$ ${item.price}`)).toBeInTheDocument()
        })
    })

    it('should call addToCart width correct item and count when Add to cart button is clicked', () => {
        const itemList: Item[] = [
            {
                id: 1,
                name: 'Tomato',
                price: 10,
                image: 'https://example.com/image.jpg',
            },
            {
                id: 2,
                name: 'Potato',
                price: 20,
                image: 'https://example.com/image.jpg',
            },
        ]

        const addToCart = vi.fn()

        const { getAllByRole } = render(<Catalog itemList={itemList} addToCart={addToCart} />)

        const allAddButton = getAllByRole('button', { name: 'Add to cart' })
        const allPlusButton = getAllByRole('button', { name: '+' })

        fireEvent.click(allPlusButton[0])
        fireEvent.click(allAddButton[0])

        expect(addToCart).toHaveBeenCalledWith(itemList[0], 1)

        fireEvent.click(allPlusButton[1])
        fireEvent.click(allPlusButton[1])
        fireEvent.click(allAddButton[1])

        expect(addToCart).toHaveBeenCalledWith(itemList[1], 2)
    })
})
