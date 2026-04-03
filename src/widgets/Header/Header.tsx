import './style.scss'
import Badge from "../../shared/Badge/Badge"
import CardButton from '../../shared/CartButton/CartButton'
import { useState, useRef } from 'react';
import Modal from '../../widgets/Modal/Modal'

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    // useLockBodyScroll(isOpen)

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (<>
        <header className="header">
            <Badge text='Vegetable' color="white">
                <Badge text='SHOP' color="green"></Badge>
            </Badge>

            <CardButton  text='Cart' onClick={togglePopup}/>
        </header>
        <Modal isOpen={isOpen} onRequestClose={togglePopup}/>
    </>)
}

export default Header