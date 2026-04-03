import StepperButton from "../StepperButton/StepperButton"
import classNames from "classnames"
import "./style.scss"
import { useState } from 'react'

export default function StepperCounter() {
    const [count, setCount] = useState(0)

    const handleIncrement = () => setCount(count + 1)
    const handleDecrement = () => setCount(count - 1)

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
