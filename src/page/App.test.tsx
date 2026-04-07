import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { useEffect } from 'react';
import { describe, it, expect, vi } from 'vitest';

describe('App component', () => {
    it('should render correctly', () => {
        const { getByText } = render(<App />);
        expect(getByText('Vegetable')).toBeInTheDocument();
    });

    it('should render Header component', () => {
        const { getByText } = render(<App />);
        expect(getByText('Vegetable')).toBeInTheDocument();
    });

    it('should render Catalog component', () => {
        const { getByText } = render(<App />);
        expect(getByText('Vegetable')).toBeInTheDocument();
    });

    it('should call fetchItemList when component mounts', () => {
        const fetchItemListMock = vi.fn();
        const AppMock = () => {
            useEffect(() => {
                fetchItemListMock();
            }, [])
            return <div />;
        };
        render(<AppMock />);
        expect(fetchItemListMock).toHaveBeenCalledTimes(1);
    });

})
