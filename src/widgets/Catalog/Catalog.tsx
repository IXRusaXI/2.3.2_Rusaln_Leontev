import './style.scss'
import Card from './../Card/Card'
import { useState, useEffect } from 'react'

export interface Item {
    id: number,
    name: string,
    price: number,
    image: string,
}

interface CatalogProps {
    itemList: Item[]
}

export default function Catalog({itemList}: CatalogProps) {
    
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
