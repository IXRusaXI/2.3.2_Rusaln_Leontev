import StepperButton from "../../shared/StepperButton/StepperButton";
import './style.scss'
import useLockBodyScroll from '../../features/useLockBodyScroll/useLockBodyScroll'
import type { Item } from "../Catalog/Catalog";
import ModalCard from "../../shared/ModalCard/ModalCard";
import { useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    productList?: Map<Item, number>;
    onRequestClose: () => void;
    removeFromCart: (item: Item) => void;
    updateCart: (item: Item, count: number) => void;
    totalCount: number
}

const Modal = ({
    isOpen, 
    productList, 
    onRequestClose, 
    removeFromCart,
    updateCart,
    totalCount
}: ModalProps) => {
    const [products, setProducts] = useState<[Item, number][]>([])
        console.log("Сука", totalCount)
    useEffect(() => {
        console.log("Обновил списо продуктов в корзине",
            productList?.size,
            totalCount
        )
        if (productList) {
            const array = Array.from(productList?.entries())
            setProducts(array)
        }
    }, [totalCount, productList?.size, isOpen])

    if (!isOpen) return null;

    function deleteOne() {
        setProducts(prev => prev.slice(0, prev.length - 1))
    }

    const total = '12'

    return (
        <div className="overlay" onClick={onRequestClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal__product-list">
                    {products?.map(([item, count], index ) => (
                        
                    <ModalCard 
                        removeFromCart={(item) => removeFromCart(item)} 
                        updateCart={(item, count) => updateCart(item, count)}
                        count={count} 
                        key={item.id} 
                        item={item} 
                        bordered={index !== products.length - 1}
                    />))}
                </div>

                <div className="modal__total">
                    <span className="modal__total-text">Total:</span>
                    <span>$ {total}</span>

                    <button onClick={deleteOne} style={{width: '20px', height: '20px'}}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}


export default Modal