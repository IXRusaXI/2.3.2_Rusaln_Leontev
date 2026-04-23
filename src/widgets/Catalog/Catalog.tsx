import './style.scss'
import Card from './../Card/Card'
import { useAppSelector } from '../../store/typedHooks';

export default function Catalog() {
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
                    />
                );
            })}
          </div>
        </div>
    )
}
