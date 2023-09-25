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
import { useCallback, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { EditTaskModal } from '../../../../components/EditTaskModal'

interface TaskCardProps {
  id: string
  title: string
  status: 'opened' | 'in_progress' | 'concluded'
  priority: 'normal' | 'high' | 'urgent'
  maturity: Date
  description: string
}

export function TaskCard({
  id,
  title,
  maturity,
  priority,
  status,
  description,
}: TaskCardProps) {
  const [togleModalEdit, setTogleModalEdit] = useState(false)
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

  const handleTogleModal = useCallback(() => {
    setTogleModalEdit(false)
  }, [])

  const formattedTaskData = {
    taskId: id,
    taskDescription: description,
    taskMaturity: maturity.toString(),
    taskPriority: priority,
    taskTitle: title,
  }

  return (
    <Dialog.Root open={togleModalEdit} onOpenChange={setTogleModalEdit}>
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
        task={formattedTaskData}
        handleTogleModal={handleTogleModal}
      />
    </Dialog.Root>
  )
}
