import {
  Card as MantineCard,
  Image,
  Group,
  Text,
  Stack,
} from '@mantine/core'
import './style.scss'
import CatalogButton from '../../shared/CatalogButton/CatalogButton'
import StepperCounter from '../../shared/StepperCounter/StepperCounter'
import { useState } from 'react'
import type { Item } from '../../store/store'
import { useAppDispatch } from '../../store/typedHooks'
import { cartActions } from '../../store/slices/cart/cartSlice'

interface CardProps {
  item: Item
}

export default function Card({ item }: CardProps) {
  const dispatch = useAppDispatch()

  const [count, setCount] = useState(0)
  const { name, price, image } = item
  const [title, weight] = name.split(' - ')

  function onClick() {
    if (count === 0) return
    dispatch(cartActions.addProduct({ item, count }))
  }

  return (
    <MantineCard
      className="card"
      withBorder={false}
      radius={16}
      p={20}
      shadow="xs"
    >
      <Image src={image} alt={title} className="card__image" />

      <Stack gap="sm" w="100%" mt="md">
        <Group justify="space-between" align="center" w="100%">
          <Group gap={16} align="center">
            <Text fw={600} className="card__name">
              {title}
            </Text>
            <Text c="gray">{weight}</Text>
          </Group>

          <StepperCounter count={count} updateCount={setCount} />
        </Group>

        <Group justify="space-between" align="center" w="100%">
          <Text fw={600}>$ {price}</Text>

          <CatalogButton onClick={onClick} text="Add to cart" />
        </Group>
      </Stack>
    </MantineCard>
  )
}