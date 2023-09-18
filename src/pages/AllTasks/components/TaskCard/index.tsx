import { Calendar, Circle, Flag } from '@phosphor-icons/react'
import {
  CardElements,
  CardHeader,
  CardTitle,
  Container,
  Maturity,
  Priority,
  Status,
} from './styles'
import { format } from 'date-fns'
import { useCallback } from 'react'

interface TaskCardProps {
  title: string
  status: string
  priority: string
  maturity: Date
}

export function TaskCard({ title, maturity, priority, status }: TaskCardProps) {
  const formattedMaturity = format(new Date(maturity), 'dd/MM/yyyy')

  const formattedStatus = useCallback((status: string) => {
    if (status === 'opened') {
      return 'Em Aberto'
    }
    if (status === 'in_progress') {
      return 'Em Aberto'
    }

    if (status === 'concluded') {
      return 'Em Aberto'
    }
  }, [])

  return (
    <Container>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <Status>
          <Circle weight="fill" />
          <span>{formattedStatus(status)}</span>
        </Status>
      </CardHeader>
      <CardElements>
        <Priority>
          <Flag weight="fill" />
          <span>{priority}</span>
        </Priority>
        <Maturity>
          <Calendar />
          <span>{formattedMaturity}</span>
        </Maturity>
      </CardElements>
    </Container>
  )
}
