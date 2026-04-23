import { useEffect } from 'react'
import Header from '../widgets/Header/Header'
import Catalog from '../widgets/Catalog/Catalog'
import './App.css'
import Cart from '../widgets/Cart/Cart'
import { useAppDispatch } from './../store/typedHooks'
import { fetchProducts } from './../store/slices/products/productThunk'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(fetchProducts())
  }, [])

  return (<div className='app'>
        <Header />
        <Catalog />
        <Cart />
    </div>
  )
}

export default App