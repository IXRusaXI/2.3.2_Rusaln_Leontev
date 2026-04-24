import { Group, Text } from '@mantine/core'
import StepperButton from '../StepperButton/StepperButton'
import { useAppDispatch } from '../../store/typedHooks'
import { cartActions } from '../../store/slices/cart/cartSlice'
import type { Item } from '../../store/store'

interface CartStepperCounterProps {
  product: Item
  count: number
}

export default function CartStepperCounter({
  product,
  count,
}: CartStepperCounterProps) {
  const dispatch = useAppDispatch()

  const handleIncrement = () => {
    dispatch(cartActions.incrementProduct(product))
  }

  const handleDecrement = () => {
    dispatch(cartActions.decrementProduct(product))
  }

  return (
    <Group gap={6} align="center">
      <StepperButton onClick={handleDecrement}>-</StepperButton>

      <Text ta="center" w={30}>
        {count}
      </Text>

      <StepperButton onClick={handleIncrement}>+</StepperButton>
    </Group>
  )
}