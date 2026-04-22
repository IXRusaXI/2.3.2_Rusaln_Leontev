import './style.scss'
import Badge from "../../shared/Badge/Badge"
import CardButton from '../../shared/CartButton/CartButton'
import { useAppDispatch, useAppSelector } from '../../store/typedHooks';
import { modalActions } from '../../store/slices/modal/modalSlice';

function Header() {
    const dispatch = useAppDispatch()
    const productList = useAppSelector((state) => state.cart.cartList)

    return (<>
        <header className="header">
            <Badge text='Vegetable' color="white">
                <Badge text='SHOP' color="green"></Badge>
            </Badge>

            <CardButton productCount={productList.size} text='Cart' onClick={() => dispatch(modalActions.toggleCartModal())}/>
        </header>
    </>)
}

export default Header