import { useMemo } from 'react'
import { Container, StatusPhrase, TaskCount } from './styled'

interface ResumeCardProps {
  amount: number
  status:
    | 'opened'
    | 'stand_by'
    | 'in_progress'
    | 'approval'
    | 'payment'
    | 'concluded'
}

export function ResumeCard({ amount, status }: ResumeCardProps) {
  const formattedStatusPhrase = useMemo(() => {
    if (status === 'opened') {
      return 'Tarefas em Aberto'
    }
    if (status === 'stand_by') {
      return 'Tarefas em StandBy'
    }
    if (status === 'in_progress') {
      return 'Tarefas em Andamento'
    }
    if (status === 'approval') {
      return 'Tarefas Aguradando Aprovação'
    }
    if (status === 'payment') {
      return 'Tarefas Aguradando Pagamento'
    }
    if (status === 'concluded') {
      return 'Tarefas Concluídas'
    }
  }, [status])

  return (
    <Container>
      <TaskCount $status={status}>
        <div></div>
        <span>{amount}</span>
      </TaskCount>
      <StatusPhrase>{formattedStatusPhrase}</StatusPhrase>
    </Container>
  )
}
