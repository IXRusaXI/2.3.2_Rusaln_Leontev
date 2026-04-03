import './style.scss'
import Badge from "../../shared/Badge/Badge"
import CardButton from '../../shared/Button/CartButton'

function Header() {

    return (
        <header className="header">
            <Badge text='Vegetable' color="white">
                <Badge text='SHOP' color="green"></Badge>
            </Badge>

            <CardButton text='Cart' color='green' />
        </header>
    )
}

export default Header