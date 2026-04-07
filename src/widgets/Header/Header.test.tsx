import { render, fireEvent } from '@testing-library/react';
import Header from './Header';
import { describe, it, expect, vi } from 'vitest';

describe('Header component', () => {
    it('should render correctly', () => {
        const { getByText } = render(<Header togglePopup={() => {}} productCount={0} />);
        expect(getByText('Vegetable')).toBeInTheDocument();
        expect(getByText('SHOP')).toBeInTheDocument();
        expect(getByText('Cart')).toBeInTheDocument();
    });

    it('should call togglePopup when Cart button is clicked', () => {
        const togglePopup = vi.fn()

        const { getByRole } = render(<Header togglePopup={togglePopup} productCount={0} />);

        const cartButton = getByRole('button', { name: 'Cart' });

        fireEvent.click(cartButton);

        expect(togglePopup).toHaveBeenCalledTimes(1);
    });

    it('should display product count', () => {
        const { getByText } = render(<Header togglePopup={() => {}} productCount={5} />);

        expect(getByText('5')).toBeInTheDocument();
    });

    it('should not display product count when it is zero', () => {
        const { queryByText } = render(<Header togglePopup={() => {}} productCount={0} />);

        expect(queryByText('0')).not.toBeInTheDocument();
    });
});
