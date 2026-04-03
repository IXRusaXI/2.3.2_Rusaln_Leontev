import StepperButton from "../../shared/StepperButton/StepperButton";
import './style.scss'
import useLockBodyScroll from '../../features/useLockBodyScroll/useLockBodyScroll'


const Modal = ({isOpen, onRequestClose}: {isOpen: boolean, onRequestClose: () => void}) => {
    useLockBodyScroll(isOpen)
    if (!isOpen) return null;

    const cartList = ''
    const total = ''

    return (
        <div className="overlay" onClick={onRequestClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {cartList}

                <div className="modal__total">
                    <span className="modal__total-text">Total:</span>
                    {total}
                </div>
            </div>
        </div>
    );
}


export default Modal