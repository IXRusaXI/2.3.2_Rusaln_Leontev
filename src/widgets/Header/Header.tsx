import './style.scss'
import Badge from "../../shared/Badge/Badge"
import CardButton from '../../shared/CartButton/CartButton'
import { useState, useRef } from 'react';
import Modal from '../../widgets/Modal/Modal'
import type { Item } from '../Catalog/Catalog';

interface HeaderProps {
    products: Map<Item, number>;
    removeFromCart: (item: Item) => void;
    updateCart: (item: Item, count: number) => void;
    totalCount: number
}

function Header({ 
    products, 
    removeFromCart, 
    updateCart, 
    totalCount 
}: HeaderProps) {
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
        <Modal 
            totalCount={totalCount}
            productList={products} 
            isOpen={isOpen} 
            onRequestClose={togglePopup}
            removeFromCart={(item) => removeFromCart(item)}
            updateCart={(item, count) => updateCart(item, count)}
        />
    </>)
}

export default Header