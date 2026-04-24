import { Box, Flex, Paper } from '@mantine/core'
import Badge from '../../shared/Badge/Badge'
import CartButton from '../../shared/CartButton/CartButton'
import { useAppDispatch } from '../../store/typedHooks'
import { modalActions } from '../../store/slices/modal/modalSlice'
import './style.scss'

function Header() {
  const dispatch = useAppDispatch()

  const handleCartClick = () => {
    dispatch(modalActions.toggleCartModal())
  }

  return (
    <Box component="header" className="header-sticky">
      <Paper
        radius={0}
        withBorder={false}
        shadow="sm"
        bg="white"
        h={60}
        px={20}
      >
        <Flex
          w="100%"
          h="100%"
          align="center"
          justify="space-between"
        >
          <Badge text="Vegetable" color="white">
            <Badge text="SHOP" color="green" />
          </Badge>

          <CartButton text="Cart" onClick={handleCartClick} />
        </Flex>
      </Paper>
    </Box>
  )
}

export default Header