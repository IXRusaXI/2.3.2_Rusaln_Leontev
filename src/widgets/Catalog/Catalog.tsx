import { Box, Title } from '@mantine/core'
import Card from '../Card/Card'
import { useAppSelector } from '../../store/typedHooks'
import './style.scss'

export default function Catalog() {
  const productList = useAppSelector((state) => state.products.productList)

  return (
    <Box
      component="section"
      className="catalog"
      px={60}
      pt={20}
      pb={40}
    //   w="100%"
    >
      <Title order={1} fw={600} mb={20}>
        Catalog
      </Title>

      <Box className="catalog__list">
        {productList &&
          productList.map((product) => (
            <Card key={product.id} item={product} />
          ))}
      </Box>
    </Box>
  )
}