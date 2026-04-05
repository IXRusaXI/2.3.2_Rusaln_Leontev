import './style.scss'
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
    const [totalCost, setTotalCost] = useState(0)
        console.log("Сука", isOpen)
    useEffect(() => {
        console.log("Обновил списо продуктов в корзине",
            productList?.size,
            totalCount
        )
        if (productList) {
            const array = Array.from(productList?.entries())
            setTotalCost(calculateTotalCost(array))
            setProducts(array)
        }
    }, [totalCount, productList?.size, isOpen])



    function deleteOne() {
        setProducts(prev => prev.slice(0, prev.length - 1))
    }

    function calculateTotalCost(list: [Item, number][]) {
        let total = 0
        list.forEach(([item, count]) => {
            total += item.price * count
        })
        return total
    }

    if (!isOpen) return null;

    return (
        <div className="overlay" onClick={onRequestClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {(totalCost !== 0) && <div className="modal__product-list">
                    {products?.map(([item, count], index ) => (
                        
                    <ModalCard 
                        removeFromCart={(item) => removeFromCart(item)} 
                        updateCart={(item, count) => updateCart(item, count)}
                        count={count} 
                        key={item.id} 
                        item={item} 
                        bordered={index !== products.length - 1}
                    />))}
                </div>}

                {(totalCost !== 0) && <div className="modal__total">
                    <span className="modal__total-text">Total:</span>
                    <span>$ {totalCost}</span>

                    <button onClick={deleteOne} style={{width: '20px', height: '20px'}}>
                        Delete
                    </button>
                </div>}

                {(totalCost === 0) && <div className='modal__blank'></div>}
            </div>
        </div>
    );
}


export default Modal