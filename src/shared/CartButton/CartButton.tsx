import classNames from "classnames"
import './style.scss'
import whiteCart from './../icons/whiteCart.svg'
import { useAppSelector } from "../../store/typedHooks";

interface CardButtonProps {
    text: string,
    onClick?: () => void;
}

function CardButton({text, onClick }: CardButtonProps) {
    const productList = useAppSelector((state) => state.cart.cartList)
    const productCount = Object.keys(productList).length

    return <button 
                onClick={onClick}
                className={classNames(
                    "cart-button" 
            )}>
        {productCount !== 0 && <span className="cart-button__count">{productCount}</span>}        
        <span className={classNames('text')}>
            {text}
        </span>

        <img src={whiteCart} />
    </button>
}

export default CardButton