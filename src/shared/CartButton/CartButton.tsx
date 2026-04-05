import classNames from "classnames"
import './style.scss'
import whiteCart from './../icons/whiteCart.svg'
import greenCart from './../icons/greenCart.svg'

interface CardButtonProps {
    text: string,
    add?: boolean
    onClick?: () => void;
    productCount?: number
}

function CardButton({text, add, onClick, productCount}: CardButtonProps) {

    const type = add ? "cart-button" : "cart-button"
    
    return <button 
                onClick={onClick}
                className={classNames(
                    "cart-button", 
                    add ? " cart-button--add" : ""
            )}>
        {!!productCount && <span className="cart-button__count">{productCount}</span>}        
        <span className={classNames(type + '__text')}>
            {text}
        </span>

        <img src={add ? greenCart : whiteCart} />
    </button>
}

export default CardButton