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
import * as Dialog from '@radix-ui/react-dialog'
import { EditTaskModal } from '../../../../components/EditTaskModal'

interface TaskCardProps {
  title: string
  status: 'opened' | 'in_progress' | 'concluded'
  priority: 'normal' | 'high' | 'urgent'
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

  const formattedPriority = useCallback((priority: string) => {
    if (priority === 'normal') {
      return 'Normal'
    }
    if (priority === 'high') {
      return 'Importante'
    }
    if (priority === 'urgent') {
      return 'Urgente'
    }
  }, [])

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Container>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <Status>
              <Circle weight="fill" />
              <span>{formattedStatus(status)}</span>
            </Status>
          </CardHeader>
          <CardElements>
            <Priority level={priority}>
              <Flag weight="fill" />
              <span>{formattedPriority(priority)}</span>
            </Priority>
            <Maturity>
              <Calendar />
              <span>{formattedMaturity}</span>
            </Maturity>
          </CardElements>
        </Container>
      </Dialog.Trigger>
      <EditTaskModal
        task={{
          taskDescription: '',
          taskMaturity: maturity,
          taskPriority: priority,
          taskTitle: title,
        }}
      />
    </Dialog.Root>
  )
}
