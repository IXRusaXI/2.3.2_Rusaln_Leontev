import { useState, useEffect } from 'react'
import Header from '../widgets/Header/Header'
import Catalog from '../widgets/Catalog/Catalog'
import Modal from '../widgets/Modal/Modal'
import './App.css'
import type { Item } from '../widgets/Catalog/Catalog'

function App() {
  const [products, setProducts] = useState<Item[]>([])
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

  useEffect(() => {
    setProducts(itemList.splice(0, 3))
  }, [itemList])

  return (<div className='app'>
        <Header 
          products={products} 
          // setProducts={setProducts}
        />
        <Catalog 
          itemList={itemList}
          // products={products} 
          // setProducts={setProducts}
        />
    </div>
  )
}

export default App
