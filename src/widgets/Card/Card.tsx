import classNames from "classnames"
import './style.scss'
import CardButton from "../../shared/CartButton/CartButton"
import StepperCounter from "../../shared/StepperCounter/StepperCounter"

interface CardProps {
    title: string
    price: number
    image?: string
}

export default function Card({title, price, image}: CardProps) {
    const [name, weight] = title.split(' - ')

    return (
        <div className={classNames('card')}>
            <img src={image} className="card__image" alt={title} />
        
            <div className="card__row-wrapper">
                <div className="card__title">
                    <h2 className="card__name">{name}</h2>
                    <span className="card__weight">{weight}</span>
                </div>

                <StepperCounter />
            </div>

            <div className="card__row-wrapper">
                <span className="card__price">$ {price}</span>

                <CardButton text='Add to cart' add={true}/>
            </div>
        </div>
    )
}
