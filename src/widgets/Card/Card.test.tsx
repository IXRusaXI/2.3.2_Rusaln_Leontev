// import { describe, it, expect, vi } from 'vitest';
// import { render, fireEvent } from '@testing-library/react';
// import Card from './Card'
// import type { Item } from '../../store/store';

// describe('Card component', () => {
//     it('should render correctly', () => {
//         const item: Item = {
//             id: 1,
//             name: 'Tomato',
//             price: 10,
//             image: 'https://example.com/image.jpg',
//         }

//         const { getByText } = render(<Card item={item} addToCart={() => {}} />);

//         expect(getByText(item.name)).toBeInTheDocument()
//         expect(getByText(`$ ${item.price}`)).toBeInTheDocument()
//     })

//     it('should call addToCart width correct item and count', () => {
//         const item: Item = {
//             id: 1,
//             name: 'Tomato',
//             price: 10,
//             image: 'https://example.com/image.jpg',
//         }

//         const addToCart = vi.fn()

//         const { getByRole } = render(<Card item={item} addToCart={addToCart} />);

//         const plusButton = getByRole('button', { name: '+' })
//         const addButton = getByRole('button', { name: 'Add to cart' })

//         expect(addButton).toBeInTheDocument()

//         fireEvent.click(plusButton) 
//         fireEvent.click(plusButton) 
//         fireEvent.click(addButton)

//         expect(addToCart).toHaveBeenCalledWith(item, 0)
//     })
// })
