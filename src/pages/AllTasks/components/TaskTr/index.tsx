import { Calendar, Flag, Folder } from '@phosphor-icons/react'
import { TaskSchema } from '../../../../hooks/useGetTasks'
import { format } from 'date-fns'
import {
  MaturityContainer,
  PriorityContainer,
  StatusContainer,
  TableTr,
} from './style'
import { useCallback, useMemo, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { EditTaskModal } from '../../../../components/EditTaskModal'

interface TaskTrProps {
  task: TaskSchema
}

export function TaskTr({ task }: TaskTrProps) {
  const [togleModalEdit, setTogleModalEdit] = useState(false)

  const formattedDate = format(new Date(task.maturity), 'dd/MM/yyyy')

  const formattedStatus = useMemo(() => {
    if (task.status === 'opened') {
      return 'Em Aberto'
    }
    if (task.status === 'stand_by') {
      return 'StandBy'
    }
    if (task.status === 'in_progress') {
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
        <TableTr key={task.id}>
          <td>
            <div>
              <Folder />
              {task.title}
            </div>
          </td>
          <td>
            <StatusContainer status={task.status}>
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
            <PriorityContainer priority={task.priority}>
              <Flag weight="fill" />
              {formattedPriority}
            </PriorityContainer>
          </td>
        </TableTr>
      </Dialog.Trigger>
      <EditTaskModal task={task} handleTogleModal={handleTogleModal} />
    </Dialog.Root>
  )
}
