// import { describe, it, expect, vi } from 'vitest';
// import { render, fireEvent } from '@testing-library/react';
// import StepperCounter from './StepperCounter'
// import type { Item } from "../../widgets/Catalog/Catalog";

// describe('StepperCounter component', () => {
//     it('should render correctly', () => {
//         const item: Item = {
//             id: 1,
//             name: 'Tomato',
//             price: 10,
//             image: 'https://example.com/image.jpg',
//         }

//         const { getByText } = render(<StepperCounter
//             item={item} 
//             removeFromCart={() => {}}
//             updateCart={() => {}}
//             initialCount={0}
//         />)

//         expect(getByText('+')).toBeInTheDocument()
//         expect(getByText('-')).toBeInTheDocument()
//         expect(getByText('0')).toBeInTheDocument()
//     })

//     it('should call removeFromCart when minus button is clicked', () => {
//         const item: Item = {
//             id: 1,
//             name: 'Tomato',
//             price: 10,
//             image: 'https://example.com/image.jpg',
//         }

//         const removeFromCart = vi.fn()

//         const { getByRole } = render(<StepperCounter
//             item={item} 
//             updateCart={() => {}}
//             removeFromCart={removeFromCart} 
//             initialCount={1}
//         />)

//         const minusButton = getByRole('button', { name: '-' })

//         fireEvent.click(minusButton)

//         expect(removeFromCart).toHaveBeenCalledTimes(1)
//         expect(removeFromCart).toHaveBeenCalledWith(item)
//     })
// })
