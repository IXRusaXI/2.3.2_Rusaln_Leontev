import './style.scss'
import ModalCard from "../../shared/ModalCard/ModalCard";
import { useAppDispatch, useAppSelector } from '../../store/typedHooks';
import { modalActions } from '../../store/slices/modal/modalSlice';

const Cart = () => {
    const dispatch = useAppDispatch()

    const cartList = useAppSelector((state) => state.cart.cartList)
    const total = useAppSelector((state) => state.cart.total)
    const isOpen = useAppSelector((state) => state.modal.isCartOpen)

    const productCount = Object.keys(cartList).length

    if (!isOpen) return null;

    return (
        <div className="overlay" onClick={() => dispatch(modalActions.toggleCartModal())} data-testid="overlay">
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {(productCount !== 0) && <div className="modal__product-list">
                    { Object.keys(cartList).map((id, index) => (
                        
                    <ModalCard 
                        count={cartList[id].count} 
                        key={id} 
                        item={cartList[id].item} 
                        bordered={index !== productCount - 1}
                    />))}
                </div>}

                {(productCount !== 0) && <div className="modal__total">
                    <span className="modal__total-text">Total:</span>
                    <span>$ {total}</span>
                </div>}

                {(productCount === 0) && <div className='modal__blank'>
                    <span className="modal__blank-icon"></span>
                    <span>Your cart is empty</span> 
                </div>}
            </div>
        </div>
    );
}


export default Cart