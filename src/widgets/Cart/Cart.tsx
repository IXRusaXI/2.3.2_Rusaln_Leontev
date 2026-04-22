import './style.scss'
import ModalCard from "../../shared/ModalCard/ModalCard";
import { useAppDispatch, useAppSelector } from '../../store/typedHooks';
import { modalActions } from '../../store/slices/modal/modalSlice';

const Cart = () => {
    const dispatch = useAppDispatch()

    const cartList = useAppSelector((state) => state.cart.cartList)
    const total = useAppSelector((state) => state.cart.total)
    const isOpen = useAppSelector((state) => state.modal.isCartOpen)

    if (!isOpen) return null;

    return (
        <div className="overlay" onClick={() => dispatch(modalActions.toggleCartModal())} data-testid="overlay">
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {(total !== 0) && <div className="modal__product-list">
                    {Array.from(cartList.entries()).map(([item, count], index ) => (
                        
                    <ModalCard 
                        count={count} 
                        key={item.id} 
                        item={item} 
                        bordered={index !== cartList.size - 1}
                    />))}
                </div>}

                {(total !== 0) && <div className="modal__total">
                    <span className="modal__total-text">Total:</span>
                    <span>$ {total}</span>
                </div>}

                {(total === 0) && <div className='modal__blank'>
                    <span className="modal__blank-icon"></span>
                    <span>Your cart is empty</span> 
                </div>}
            </div>
        </div>
    );
}


export default Cart