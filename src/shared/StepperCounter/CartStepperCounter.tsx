import StepperButton from "../StepperButton/StepperButton"
import "./style.scss"
import { useAppDispatch } from "../../store/typedHooks";
import { cartActions } from "../../store/slices/cart/cartSlice";
import type { Item } from "../../store/store";

interface CartStepperCounterProps {
    product: Item;
    count: number;
}

export default function CartStepperCounter({
    product,
    count,
}: CartStepperCounterProps) {
    const dispatch = useAppDispatch()

    const handleIncrement = () => {
        dispatch(cartActions.incrementProduct(product))
    }

    const handleDecrement = () => {
        dispatch(cartActions.decrementProduct(product))
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
