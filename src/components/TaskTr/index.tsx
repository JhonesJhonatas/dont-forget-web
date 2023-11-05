import { Calendar, Flag, Folder } from '@phosphor-icons/react'
import { format } from 'date-fns'
import {
  MaturityContainer,
  PriorityContainer,
  StatusContainer,
  TableTr,
} from './style'
import { useCallback, useMemo, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { EditTaskModal } from '../EditTaskModal'

interface Task {
  id: string
  title: string
  description: string
  priority: string
  status: string
  maturity: string
  createdAt: string
  completedAt?: string
  projectId: string
  userId: string
}

interface TaskTrProps {
  task: Task
}

export function TaskTr({ task }: TaskTrProps) {
  const [togleModalEdit, setTogleModalEdit] = useState(false)

  const formattedDate = format(new Date(task.maturity), 'dd/MM/yyyy')

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
      return 'Alta'
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
        <TableTr key={task.id}>
          <td>
            <div>
              <Folder />
              {task.title}
            </div>
          </td>
          <td>
            <StatusContainer $status={task.status}>
              <div></div>
              {formattedStatus}
            </StatusContainer>{' '}
          </td>
          <td>
            <MaturityContainer>
              <Calendar />
              {formattedDate}
            </MaturityContainer>
          </td>
          <td>
            <PriorityContainer $priority={task.priority}>
              <Flag weight="fill" />
              {formattedPriority}
            </PriorityContainer>
          </td>
        </TableTr>
      </Dialog.Trigger>
      <EditTaskModal
        task={task}
        handleTogleModal={handleTogleModal}
        isTaskConcluded={task.status === 'concluded'}
      />
    </Dialog.Root>
  )
}
