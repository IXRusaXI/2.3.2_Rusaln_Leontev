import './style.scss'
import Badge from "../../shared/Badge/Badge"
import CardButton from '../../shared/CartButton/CartButton'
import { useState, useRef } from 'react';
import Modal from '../../widgets/Modal/Modal'
import type { Item } from '../Catalog/Catalog';

interface HeaderProps {
    products: Item[]
}

function Header({ products }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);

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
        <Modal productList={products} isOpen={isOpen} onRequestClose={togglePopup}/>
    </>)
}

export default Header