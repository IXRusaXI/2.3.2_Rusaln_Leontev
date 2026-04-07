import { useState, useEffect } from 'react'
import Header from '../widgets/Header/Header'
import Catalog from '../widgets/Catalog/Catalog'
import './App.css'
import type { Item } from '../widgets/Catalog/Catalog'
import Modal from '../widgets/Modal/Modal'

function App() {
  const [products, setProducts] = useState<Map<Item, number>>(new Map())
  const [itemList, setItemList] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false);

  const fetchItemList = async () => {
      const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
      const respItemList = await response.json()
      return respItemList
  }

  useEffect(() => {
      fetchItemList()
      .then(itemList => setItemList(itemList))
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    const keys = itemList.slice(0, 5)
    let totalCount = 0

    const setProducts = () => {
      keys.forEach((item: Item) => {
        products.set(item, 5)
        totalCount += 5
      })
    }

    setProducts()
    setTotalCount(totalCount)
  }, [itemList])

  function addToCart(item: Item, count: number) {
    if (count === 0) return

    let newCount = count
    if (products.has(item)) {
      newCount = (products.get(item) || 0) + count
    } 

    updateCart(item, newCount)
  }

  function updateCart(item: Item, count: number) {
    console.log("Products: ", products);

    if (count === 0) {
      removeFromCart(item)
      return
    }

    products.set(item, count)

    const newProducts = new Map()
    let newTotalCount = 0
    Array.from(products.entries()).forEach(([key, value]) => {
      newProducts.set(key, value)
      newTotalCount += value
    })
    
    setProducts(newProducts)
    setTotalCount(newTotalCount)
    console.log("Products: ", products);
  }

  function removeFromCart(item: Item) {
    products.delete(item)

    const newProducts = new Map()
    Array.from(products.entries()).forEach(([key, value]) => newProducts.set(key, value))
    setProducts(newProducts)
  }

  const togglePopup = () => {
      setIsOpen(!isOpen);
  };

    
  return (<div className='app'>
        <Header 
          productCount={products.size}
          togglePopup={() => togglePopup()}
        />
        <Catalog 
          itemList={itemList}
          addToCart={(item, count) => addToCart(item, count)}
        />
        <Modal 
          isOpen={isOpen}
          totalCount={totalCount}
          productList={products}
          onRequestClose={togglePopup}
          removeFromCart={(item) => removeFromCart(item)}
          updateCart={(item, count) => updateCart(item, count)}
        />
    </div>
  )
}

export default App