import StepperButton from "../../shared/StepperButton/StepperButton";
import './style.scss'
import useLockBodyScroll from '../../features/useLockBodyScroll/useLockBodyScroll'
import type { Item } from "../Catalog/Catalog";
import ModalCard from "../../shared/ModalCard/ModalCard";

interface ModalProps {
    isOpen: boolean;
    productList?: Item[];
    onRequestClose: () => void;
}

const Modal = ({isOpen, productList, onRequestClose}: ModalProps) => {
    // useLockBodyScroll(isOpen)
    if (!isOpen) return null;

    // const cartList = 'Список продуктов'
    const total = '12'

    return (
        <div className="overlay" onClick={onRequestClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal__product-list">
                    {productList?.map((item: Item, index) => (<>
                    <ModalCard item={item} bordered={index !== productList.length - 1}/>

                    </>))}
                </div>

                <div className="modal__total">
                    <span className="modal__total-text">Total:</span>
                    <span>$ {total}</span>
                </div>
            </div>
        </div>
    );
}


export default Modal