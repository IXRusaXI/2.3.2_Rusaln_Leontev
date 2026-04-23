import type { Item } from "../../store/store";
import CartStepperCounter from "../StepperCounter/CartStepperCounter";
import "./style.scss";
import classNames from "classnames";

interface ModalCardProps {
    item: Item;
    bordered: boolean;
    count: number;
}

function ModalCard({
    item, 
    bordered, 
    count, 
}: ModalCardProps) {
    return (
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card__image-container">
                <img className="modal-card__image" src={item.image} alt={item.name} />
            </div>
            
            <div className={classNames('modal-card__info-wrapper', bordered ?  `modal-card__info-wrapper--bordered` : ``)}>
            {/* <div className="modal-card__info-wrapper"> */}
                <div className="modal-card__info">
                    <span className="modal-card__name">{item.name}</span>
                    <span className="modal-card__price">$ {item.price}</span>
                </div>

                <CartStepperCounter 
                    product={item}
                    count={count}
                />
            </div>
        </div>
    );
}


export default ModalCard