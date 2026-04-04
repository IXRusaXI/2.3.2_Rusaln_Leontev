import type { Item } from "../../widgets/Catalog/Catalog";
import StepperCounter from "../StepperCounter/StepperCounter";
import "./style.scss";
import classNames from "classnames";

interface ModalCardProps {
    item: Item;
    bordered: boolean;
    count: number;
    removeFromCart: (item: Item) => void;
    updateCart: (item: Item, count: number) => void
}

function ModalCard({
    item, 
    bordered, 
    count, 
    removeFromCart,
    updateCart
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

                <StepperCounter 
                    item={item}
                    removeFromCart={(item) => removeFromCart(item)}
                    updateCart={(item, count) => updateCart(item, count)}
                    initialCount={count} 
                />
            </div>
        </div>
    );
}


export default ModalCard