import classNames from "classnames"
import './style.scss'
import cart from './../icons/whiteCart.svg'


interface CardButtonProps {
    text: string,
    color: string,
}

function CardButton({text, color}: CardButtonProps) {
    
    return <button className="cart-button">
        <span className="cart-button__text">
            {text}
        </span>

        <img src={cart} />
    </button>
}

export default CardButton