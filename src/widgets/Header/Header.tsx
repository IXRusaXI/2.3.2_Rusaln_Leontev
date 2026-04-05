import './style.scss'
import Badge from "../../shared/Badge/Badge"
import CardButton from '../../shared/CartButton/CartButton'

interface HeaderProps {
    togglePopup: () => void;
    productCount: number
}

function Header({ 
    togglePopup,
    productCount
}: HeaderProps) {
    return (<>
        <header className="header">
            <Badge text='Vegetable' color="white">
                <Badge text='SHOP' color="green"></Badge>
            </Badge>

            <CardButton productCount={productCount} text='Cart' onClick={() => togglePopup()}/>
        </header>
    </>)
}

export default Header