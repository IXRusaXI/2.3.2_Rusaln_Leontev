import './style.scss'
import Card from './../Card/Card'
import { useState, useEffect } from 'react'

interface Item {
    id: number,
    name: string,
    price: number,
    image: string
}

export default function Catalog() {
    const [itemList, setItemList] = useState([])

    const fetchItemList = async () => {
        const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
        const itemList = await response.json()
        return itemList
    }

    useEffect(() => {
        fetchItemList()
        .then(itemList => setItemList(itemList))
        .catch(error => console.log(error))
    }, [])

    return (
        <div className="catalog">
          <h1 className="catalog__title">Catalog</h1>
          <div className="catalog__list">
            {itemList.map((item: Item) => (
                <Card key={item.id} title={item.name} price={item.price} image={item.image} />
            ))}
          </div>
        </div>
    )
}
