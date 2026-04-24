import { Button, Image, Box, Text, Group } from '@mantine/core'
import whiteCart from './../icons/whiteCart.svg'
import { useAppSelector } from '../../store/typedHooks'

interface CartButtonProps {
  text: string
  onClick?: () => void
}

function CartButton({ text, onClick }: CartButtonProps) {
  const productList = useAppSelector((state) => state.cart.cartList)
  const productCount = Object.keys(productList).length

  return (
    <Button
      onClick={onClick}
      radius={8}
      bg="#54B46A"
      c="white"
      px={40}
      w="auto"
    >
      <Group gap={15} align="center">
        {productCount !== 0 && (
          <Box
            h={22}
            w={22}
            bg="white"
            style={{
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text fz={14} fw={600} c="#3B944E">
              {productCount}
            </Text>
          </Box>
        )}

        <Text fw={600}>{text}</Text>

        <Image src={whiteCart} alt="Cart" w={20} h={20} />
      </Group>
    </Button>
  )
}

export default CartButton