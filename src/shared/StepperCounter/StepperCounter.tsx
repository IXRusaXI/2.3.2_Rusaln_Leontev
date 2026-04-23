import StepperButton from "../StepperButton/StepperButton"
import "./style.scss"

interface StepperCounterProps {
    count: number;
    updateCount: (count: number) => void
}

export default function StepperCounter({
    count,
    updateCount
}: StepperCounterProps) {

    const handleIncrement = () => {
        updateCount(count + 1)
    }

    const handleDecrement = () => {
        if (count - 1 < 0) return

        updateCount(count - 1)
    }

    return (
        <div className="stepper-counter">
            <StepperButton onClick={handleDecrement}>
                -
            </StepperButton>

            <span className="stepper-counter__value">{count}</span>

            <StepperButton onClick={handleIncrement}>
                +
            </StepperButton>
        </div>
    )
}
