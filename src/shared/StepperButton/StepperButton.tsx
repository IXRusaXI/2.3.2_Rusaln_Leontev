import { Button } from '@mantine/core'
import type { ReactNode } from 'react'

interface StepperButtonProps {
  onClick: () => void
  children?: ReactNode
}

export default function StepperButton({ onClick, children }: StepperButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="default"
      radius="md"
      w={40}
      h={40}
      p={0}
      miw={40}
      maw={40}
      fz={30}
    >
      {children}
    </Button>
  )
}