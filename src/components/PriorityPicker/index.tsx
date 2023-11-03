import { Flag } from '@phosphor-icons/react'
import { Container } from './styles'
import { useEffect, useState } from 'react'

export function PriorityPicker() {
  const [choosedPriority, setChoosedPriority] = useState('low')
  const [formattedChoosedPriority, setFormattedChoosedPriority] =
    useState('Em Aberto')

  useEffect(() => {
    if (choosedPriority === 'low') {
      setFormattedChoosedPriority('Baixa')
    }

    if (choosedPriority === 'normal') {
      setFormattedChoosedPriority('Normal')
    }

    if (choosedPriority === 'high') {
      setFormattedChoosedPriority('Alta')
    }

    if (choosedPriority === 'urgent') {
      setFormattedChoosedPriority('Urgente')
    }
  }, [choosedPriority])

  return (
    <Container $choosedPriority={choosedPriority}>
      <Flag weight="fill" />
      <span>{formattedChoosedPriority}</span>
    </Container>
  )
}
