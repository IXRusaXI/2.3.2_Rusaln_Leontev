import './style.scss'
import Card from './../Card/Card'

export interface Item {
    id: number,
    name: string,
    price: number,
    image: string,
}

interface CatalogProps {
    itemList: Item[];
    addToCart: (item: Item, count: number) => void
}

export default function Catalog({itemList, addToCart}: CatalogProps) {
    

    return (
        <div className="catalog">
          <h1 className="catalog__title">Catalog</h1>
          <div className="catalog__list">
            {itemList.map((item) => {
                // console.log('Catalog item[' + idx + ']:', item);
                return (
                    <Card
                        key={item.id}
                        item={item}
                        addToCart={(item, count) => addToCart(item, count)}
                    />
                );
            })}
          </div>
        </div>
    )
}
