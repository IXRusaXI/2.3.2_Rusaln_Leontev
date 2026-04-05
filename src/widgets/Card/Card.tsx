import classNames from "classnames"
import './style.scss'
import CardButton from "../../shared/CartButton/CartButton"
import StepperCounter from "../../shared/StepperCounter/StepperCounter"
import type { Item } from "../Catalog/Catalog";
import { useState } from "react";

interface CardProps {
    item: Item;
    addToCart: (item: Item, count: number) => void
}

export default function Card({item, addToCart}: CardProps) {
    const [add, setAdd] = useState(false)
    const {name, price, image} = item;
    const [title, weight] = name.split(' - ')

    return (
        <div className={classNames('card')}>
            <img src={image} className="card__image" alt={title} />
        
            <div className="card__row-wrapper">
                <div className="card__title">
                    <h3 className="card__name">{title}</h3>
                    <span className="card__weight">{weight}</span>
                </div>

                <StepperCounter 
                    add={add}
                    addProductToCart={(item, count) => addToCart(item, count)} 
                    item={item} 
                    initialCount={0}
                />
            </div>

            <div className="card__row-wrapper">
                <span className="card__price">$ {price}</span>

                <CardButton 
                    onClick={() => setAdd(!add)}
                    text='Add to cart' 
                    add={true}
                />
            </div>
        </div>
    )
}
