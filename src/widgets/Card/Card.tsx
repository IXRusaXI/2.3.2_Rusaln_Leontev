import classNames from "classnames"
import './style.scss'
import CardButton from "../../shared/CartButton/CartButton"
import StepperCounter from "../../shared/StepperCounter/StepperCounter"
import { useState } from "react";
import type { Item } from "../../store/store";
import { useAppDispatch } from "../../store/typedHooks";
import { cartActions } from "../../store/slices/cart/cartSlice";

interface CardProps {
    item: Item;
    // addToCart: (item: Item, count: number) => void
}

export default function Card({item}: CardProps) {
    const dispatch = useAppDispatch()

    const [count, setCount] = useState(0)

    const {name, price, image} = item;
    const [title, weight] = name.split(' - ')

    function onClick() {
        if (count == 0) return

        dispatch(cartActions.addProduct({item, count}))
    }

    return (
        <div className={classNames('card')}>
            <img src={image} className="card__image" alt={title} />
        
            <div className="card__row-wrapper">
                <div className="card__title">
                    <h3 className="card__name">{title}</h3>
                    <span className="card__weight">{weight}</span>
                </div>

                <StepperCounter 
                    count={count}
                    updateCount={setCount}
                />
            </div>

            <div className="card__row-wrapper">
                <span className="card__price">$ {price}</span>

                <CardButton 
                    onClick={onClick}
                    text='Add to cart' 
                />
            </div>
        </div>
    )
}
