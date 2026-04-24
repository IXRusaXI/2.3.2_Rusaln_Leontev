import { useEffect } from 'react'
import { Box } from '@mantine/core'
import Header from '../widgets/Header/Header'
import Catalog from '../widgets/Catalog/Catalog'
import Cart from '../widgets/Cart/Cart'
import { useAppDispatch } from '../store/typedHooks'
import { fetchProducts } from '../store/slices/products/productThunk'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <Box
      data-testid="app-root"
      bg="#F3F5FA"
      mih="100vh"
    >
      <Header />
      <Catalog />
      <Cart />
    </Box>
  )
}

export default App