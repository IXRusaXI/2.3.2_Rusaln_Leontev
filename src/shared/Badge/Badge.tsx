import { Box, Text } from '@mantine/core'
import type { ReactNode } from 'react'

interface BadgeProps {
  text: string
  color: 'green' | 'white'
  children?: ReactNode
}

function Badge({ text, color, children }: BadgeProps) {
  const background = color === 'green' ? '#54B46A' : '#F7F7F7'
  const textColor = color === 'green' ? '#ffffff' : '#000000'
  const fontWeight = color === 'green' ? 500 : 600

  return (
    <Box
      display="flex"
      h={34}
      pl={10}
      pb={2}
      bg={background}
      c={textColor}
      fw={fontWeight}
      fz={20}
      style={{ borderRadius: 32 }}
    >
      <Text inherit mr={10}>
        {text}
      </Text>
      {children}
    </Box>
  )
}

export default Badge