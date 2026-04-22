import './style.scss'
import Card from './../Card/Card'
import { useAppDispatch, useAppSelector } from '../../store/typedHooks';
import { cartActions } from '../../store/slices/cart/cartSlice';


interface CatalogProps {
    addToCart: (item: Item, count: number) => void
}

export default function Catalog({addToCart}: CatalogProps) {
    const dispatch = useAppDispatch()
    const productList = useAppSelector((state) => state.products.productList)


    return (
        <div className="catalog">
          <h1 className="catalog__title">Catalog</h1>
          <div className="catalog__list">
            {productList && productList.map((product) => {
                return (
                    <Card
                        key={product.id}
                        item={product}
                        addToCart={() => dispatch(addToCart(p))}
                    />
                );
            })}
          </div>
        </div>
    )
}
