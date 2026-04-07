import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import CartButton from './CartButton'

describe('CartButton component', () => {
    it('should render correctly', () => {
        const { getByText } = render(<CartButton text='Cart' add={false} onClick={() => {}} />);
        expect(getByText('Cart')).toBeInTheDocument()
    })

    it('should call onClick when clicked', () => {
        const onClick = vi.fn()
        const { getByRole } = render(<CartButton text='Cart' add={false} onClick={onClick} />);
        const button = getByRole('button', { name: 'Cart' });
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    })
})
