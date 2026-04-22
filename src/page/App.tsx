import { useState, useEffect } from 'react'
import Header from '../widgets/Header/Header'
import Catalog from '../widgets/Catalog/Catalog'
import './App.css'
import type { Item } from '../widgets/Catalog/Catalog'
import Cart from '../widgets/Cart/Cart'
import { useAppDispatch, useAppSelector } from './../store/typedHooks'
import { fetchProducts } from './../store/slices/products/productThunk'

function App() {
  const dispatch = useAppDispatch()
  const productList = useAppSelector((state) => state.products.productList)

  const total = useAppSelector((state) => state.cart.total)

  const [products, setProducts] = useState<Map<Item, number>>(new Map())
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
      dispatch(fetchProducts())
  }, [])

  function addToCart(item: Item, count: number) {
    if (count === 0) return

    let newCount = count
    if (products.has(item)) {
      newCount = (products.get(item) || 0) + count
    } 

    updateCart(item, newCount)
  }

  function updateCart(item: Item, count: number) {

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
        <Header />
        <Catalog 
          productList={productList}
          addToCart={(item, count) => addToCart(item, count)}
        />
        <Cart />
    </div>
  )
}

export default App