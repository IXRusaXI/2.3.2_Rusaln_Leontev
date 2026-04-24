import { Box, Paper, Stack, Group, Text } from '@mantine/core'
import './style.scss'
import ModalCard from '../../shared/ModalCard/ModalCard'
import { useAppDispatch, useAppSelector } from '../../store/typedHooks'
import { modalActions } from '../../store/slices/modal/modalSlice'

const Cart = () => {
  const dispatch = useAppDispatch()

  const cartList = useAppSelector((state) => state.cart.cartList)
  const total = useAppSelector((state) => state.cart.total)
  const isOpen = useAppSelector((state) => state.modal.isCartOpen)

  const productCount = Object.keys(cartList).length

  if (!isOpen) return null

  const handleOverlayClick = () => {
    dispatch(modalActions.toggleCartModal())
  }

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <Box
      className="overlay"
      onClick={handleOverlayClick}
      data-testid="overlay"
    >
      <Paper
        className="modal"
        radius={16}
        p={30}
        shadow="sm"
        onClick={handleModalClick}
      >
        <Stack w="100%" h="100%" justify="space-between">
          {productCount !== 0 && (
            <Box className="modal__product-list">
              {Object.keys(cartList).map((id, index) => (
                <ModalCard
                  key={id}
                  count={cartList[id].count}
                  item={cartList[id].item}
                  bordered={index !== productCount - 1}
                />
              ))}
            </Box>
          )}

          {productCount !== 0 && (
            <Group className="modal__total" justify="space-between">
              <Text fw={700} className="modal__total-text">
                Total:
              </Text>
              <Text fw={700}>$ {total}</Text>
            </Group>
          )}

          {productCount === 0 && (
            <Box className="modal__blank">
              <span className="modal__blank-icon" />
              <Text>Your cart is empty</Text>
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  )
}

export default Cart