import { Box, Group, Image, Stack, Text } from '@mantine/core'
import type { Item } from '../../store/store'
import CartStepperCounter from '../CartStepperCounter/CartStepperCounter'
import './style.scss'

interface ModalCardProps {
  item: Item
  bordered: boolean
  count: number
}

function ModalCard({ item, bordered, count }: ModalCardProps) {
  return (
    <Box
      className="modal-card"
      // клики по строке не должны закрывать модалку
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        src={item.image}
        alt={item.name}
        className="modal-card__image"
      />

      <Group
        className="modal-card__info-wrapper"
        justify="space-between"
        align="center"
        data-bordered={bordered ? 'true' : 'false'}
      >
        <Stack className="modal-card__info" gap={4}>
          <Text fw={600} className="modal-card__name">
            {item.name}
          </Text>

          <Text fz={20} fw={500} className="modal-card__price">
            $ {item.price}
          </Text>
        </Stack>

        <CartStepperCounter product={item} count={count} />
      </Group>
    </Box>
  )
}

export default ModalCard