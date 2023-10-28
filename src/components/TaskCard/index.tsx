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
import { useCallback, useMemo, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { OpenedTask } from '../../hooks/tasks/useGetAllOpenedTasks'
import { EditTaskModal } from '../EditTaskModal'

interface TaskCardProps {
  task: OpenedTask
}

export function TaskCard({ task }: TaskCardProps) {
  const [togleModalEdit, setTogleModalEdit] = useState(false)
  const formattedMaturity = format(new Date(task.maturity), 'dd/MM/yyyy')

  const formattedStatus = useMemo(() => {
    if (task.status === 'toDo') {
      return 'Em Aberto'
    }
    if (task.status === 'standby') {
      return 'StandBy'
    }
    if (task.status === 'inProgress') {
      return 'Em Andamento'
    }
    if (task.status === 'approval') {
      return 'Aprovação'
    }
    if (task.status === 'payment') {
      return 'Pagamento'
    }
    if (task.status === 'concluded') {
      return 'Concluída'
    }
  }, [task.status])

  const formattedPriority = useMemo(() => {
    if (task.priority === 'low') {
      return 'Baixa'
    }
    if (task.priority === 'normal') {
      return 'Normal'
    }
    if (task.priority === 'high') {
      return 'Importante'
    }
    if (task.priority === 'urgent') {
      return 'Urgente'
    }
  }, [task.priority])

  const handleTogleModal = useCallback(() => {
    setTogleModalEdit(false)
  }, [])

  return (
    <Dialog.Root open={togleModalEdit} onOpenChange={setTogleModalEdit}>
      <Dialog.Trigger asChild>
        <Container>
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <Status status={task.status}>
              <Circle weight="fill" />
              <span>{formattedStatus}</span>
            </Status>
          </CardHeader>
          <CardElements>
            <Priority level={task.priority}>
              <Flag weight="fill" />
              <span>{formattedPriority}</span>
            </Priority>
            <Maturity>
              <Calendar />
              <span>{formattedMaturity}</span>
            </Maturity>
          </CardElements>
        </Container>
      </Dialog.Trigger>
      <EditTaskModal task={task} handleTogleModal={handleTogleModal} />
    </Dialog.Root>
  )
}
