import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import StepperButton from './StepperButton';

describe('StepperButton component', () => {
    it('should render correctly', () => {
        const onClick = vi.fn()
        const { getByText } = render(<StepperButton onClick={onClick}>+</StepperButton>)
        expect(getByText('+')).toBeInTheDocument()
    })

    it('should call onClick when clicked', () => {
        const onClick = vi.fn()
        const { getByRole } = render(<StepperButton onClick={onClick}>+</StepperButton>)
        const button = getByRole('button', { name: '+' })
        fireEvent.click(button)
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
