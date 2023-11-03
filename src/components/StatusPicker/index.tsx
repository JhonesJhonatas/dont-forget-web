import { Circle } from '@phosphor-icons/react'
import { Container } from './styles'
import { useEffect, useState } from 'react'

export function StatusPicker() {
  const [choosedStatus, setChoosedStatus] = useState('toDo')
  const [formattedChoosedStatus, setFormattedChoosedStatus] =
    useState('Em Aberto')

  useEffect(() => {
    if (choosedStatus === 'toDo') {
      setFormattedChoosedStatus('Em Aberto')
    }

    if (choosedStatus === 'standby') {
      setFormattedChoosedStatus('Stand By')
    }

    if (choosedStatus === 'inProgress') {
      setFormattedChoosedStatus('Em Andamento')
    }

    if (choosedStatus === 'approval') {
      setFormattedChoosedStatus('Aprovação')
    }

    if (choosedStatus === 'payment') {
      setFormattedChoosedStatus('Pagamento')
    }
  }, [choosedStatus])

  return (
    <Container $choosedStatus={choosedStatus}>
      <Circle weight="fill" />
      <span>{formattedChoosedStatus}</span>
    </Container>
  )
}
