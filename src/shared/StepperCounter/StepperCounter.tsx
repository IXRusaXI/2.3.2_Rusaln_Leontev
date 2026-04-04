import StepperButton from "../StepperButton/StepperButton"
import classNames from "classnames"
import "./style.scss"
import { useEffect, useState } from 'react'
import type { Item } from "../../widgets/Catalog/Catalog";

interface StepperCounterProps {
    item: Item;
    add?: boolean;
    initialCount: number;
    removeFromCart?: (item: Item) => void;
    updateCart?: (item: Item, count: number) => void;
    addProductToCart?: (item: Item, count: number) => void;
}

export default function StepperCounter({
    item,
    initialCount, 
    removeFromCart,
    updateCart,
    addProductToCart,
    add,
}: StepperCounterProps) {
    const [count, setCount] = useState(initialCount)

    useEffect(() => {
        if (addProductToCart) addProductToCart(item, count)
    }, [add])

    const handleIncrement = () => {
        if (updateCart) updateCart(item, count + 1)
        setCount(count + 1)
    }

    const handleDecrement = () => {
        if (count - 1 < 0) return

        if (count - 1 === 0) {
            if (removeFromCart) removeFromCart(item)
            setCount(count - 1)
            return
        }

        if (updateCart) updateCart(item, count - 1)
        setCount(count - 1)
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
