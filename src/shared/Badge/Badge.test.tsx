import { render } from '@testing-library/react';
import Badge from './Badge';
import { describe, it, expect } from 'vitest';

describe('Badge component', () => {
    it('should render correctly', () => {
        const { getByText } = render(<Badge text='Vegetable' color="white" />);

        expect(getByText('Vegetable')).toBeInTheDocument();
    });

    it('should render correctly with color green', () => {
        const { getByText } = render(<Badge text='Vegetable' color="green" />);

        expect(getByText('Vegetable')).toBeInTheDocument();
    });

    it('should render children correctly', () => {
        const { getByText } = render(<Badge text='Vegetable' color="green"><p>Child</p></Badge>);

        expect(getByText('Child')).toBeInTheDocument();
    });
});
