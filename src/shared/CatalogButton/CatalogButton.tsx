import classNames from "classnames"
import './style.scss'
import greenCart from './../icons/greenCart.svg'

interface CatalogButtonProps {
    text: string,
    onClick?: () => void;
}

function CatalogButton({text, onClick }: CatalogButtonProps) {

    return <button 
                onClick={onClick}
                className={classNames(
                    'catalog-button'
                )}>
        {text}
        <img src={greenCart} />
    </button>
}

export default CatalogButton