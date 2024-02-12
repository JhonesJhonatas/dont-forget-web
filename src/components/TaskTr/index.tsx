import { Calendar, Circle, Flag, Folder } from '@phosphor-icons/react'
import { format } from 'date-fns'
import {
  CustomDropDown,
  DescriptionContainer,
  MaturityContainer,
  PriorityContainer,
  PriorityOption,
  StatusContainer,
  StatusOption,
  TaskItem,
} from './style'
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { EditTaskModal } from '../EditTaskModal'
import { TasksContext } from '../../contexts/TaskContext'
import { api } from '../../lib/axios'

interface Task {
  id: string
  title: string
  description: string
  priority: string
  status:
    | 'toDo'
    | 'standby'
    | 'inProgress'
    | 'approval'
    | 'payment'
    | 'concluded'
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
  const [statusDropDownIsOpen, setStatusDropDownIsOpen] = useState(false)
  const [priorityDropDownIsOpen, setPriorityDropDownIsOpen] = useState(false)

  const {
    handleUpdateCompletedTasks,
    handleUpdateOpenedTasks,
    handleUpdateTasksOfWeek,
  } = useContext(TasksContext)

  const statusDropDownRef = useRef<HTMLDivElement>(null)
  const toggleStatusRef = useRef<HTMLDivElement>(null)
  const priorityDropDownRef = useRef<HTMLDivElement | null>(null)
  const togglePriorityRef = useRef<HTMLDivElement | null>(null)

  const formattedDate = format(new Date(task.maturity), 'dd/MM/yyyy')

  const formattedStatus = useMemo(() => {
    return {
      toDo: 'Em Aberto',
      standby: 'StandBy',
      inProgress: 'Em Andamento',
      approval: 'Aprovação',
      payment: 'Pagamento',
      concluded: 'Concluída',
    }
  }, [])

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

  const statusDropDownOptions = useMemo(() => {
    return [
      { label: 'Em Aberto', value: 'toDo' },
      { label: 'StandBy', value: 'standby' },
      { label: 'Em Andamento', value: 'inProgress' },
      { label: 'Aprovação', value: 'approval' },
      { label: 'Pagamento', value: 'payment' },
    ]
  }, [])

  const priorityDropDownOptions = useMemo(() => {
    return [
      { label: 'Baixa', value: 'low' },
      { label: 'Normal', value: 'normal' },
      { label: 'Alta', value: 'high' },
      { label: 'Urgente', value: 'urgent' },
    ]
  }, [])

  const handleToggleStatusDropDown = useCallback(() => {
    setStatusDropDownIsOpen((prevValue) => !prevValue)
  }, [])

  const handleTogglePriorityDropDown = useCallback(() => {
    setPriorityDropDownIsOpen((prevValue) => !prevValue)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      if (
        statusDropDownRef.current &&
        !statusDropDownRef.current.contains(event.target) &&
        toggleStatusRef.current &&
        !toggleStatusRef.current.contains(event.target)
      ) {
        setStatusDropDownIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [statusDropDownRef])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      if (
        priorityDropDownRef.current &&
        !priorityDropDownRef.current.contains(event.target) &&
        togglePriorityRef.current &&
        !togglePriorityRef.current.contains(event.target)
      ) {
        setPriorityDropDownIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [statusDropDownRef])

  const handleSetNewStatus = useCallback(
    async (status: string) => {
      try {
        const body = {
          ...task,
          status,
        }

        await api.put('/tasks/edit-task-by-id', body)

        handleUpdateOpenedTasks()
        handleUpdateCompletedTasks()
        handleUpdateTasksOfWeek()
        setStatusDropDownIsOpen(false)
      } catch (err) {
        console.log(err)
      }
    },
    [
      handleUpdateCompletedTasks,
      handleUpdateOpenedTasks,
      handleUpdateTasksOfWeek,
      task,
    ],
  )

  const handleSetNewPriority = useCallback(
    async (priority: string) => {
      try {
        const body = {
          ...task,
          priority,
        }

        await api.put('/tasks/edit-task-by-id', body)

        handleUpdateOpenedTasks()
        handleUpdateCompletedTasks()
        handleUpdateTasksOfWeek()
        setPriorityDropDownIsOpen(false)
      } catch (err) {
        console.log(err)
      }
    },
    [
      handleUpdateCompletedTasks,
      handleUpdateOpenedTasks,
      handleUpdateTasksOfWeek,
      task,
    ],
  )

  return (
    <Dialog.Root open={togleModalEdit} onOpenChange={setTogleModalEdit}>
      <TaskItem key={task.id}>
        <Dialog.Trigger asChild>
          <DescriptionContainer>
            <Folder />
            {task.title}
          </DescriptionContainer>
        </Dialog.Trigger>
        <div>
          <StatusContainer
            $status={task.status}
            ref={toggleStatusRef}
            onClick={handleToggleStatusDropDown}
          >
            <div></div>
            {formattedStatus[task.status]}
          </StatusContainer>
          <CustomDropDown
            ref={statusDropDownRef}
            $isOpen={statusDropDownIsOpen}
          >
            {statusDropDownOptions.map((item) => {
              return (
                <StatusOption
                  key={item.label}
                  $status={item.value}
                  $isActive={task.status === item.value}
                  onClick={() => handleSetNewStatus(item.value)}
                >
                  <Circle weight="fill" />
                  {item.label}
                </StatusOption>
              )
            })}
          </CustomDropDown>
        </div>
        <div>
          <PriorityContainer
            ref={togglePriorityRef}
            $priority={task.priority}
            onClick={handleTogglePriorityDropDown}
          >
            <Flag weight="fill" />
            {formattedPriority}
          </PriorityContainer>
          <CustomDropDown
            ref={priorityDropDownRef}
            $isOpen={priorityDropDownIsOpen}
          >
            {priorityDropDownOptions.map((item) => {
              return (
                <PriorityOption
                  key={item.label}
                  $priority={item.value}
                  $isActive={task.priority === item.value}
                  onClick={() => handleSetNewPriority(item.value)}
                >
                  <Flag weight="fill" />
                  {item.label}
                </PriorityOption>
              )
            })}
          </CustomDropDown>
        </div>
        <MaturityContainer>
          <Calendar />
          {formattedDate}
        </MaturityContainer>
      </TaskItem>

      <EditTaskModal
        task={task}
        handleCloseModal={handleTogleModal}
        isTaskConcluded={task.status === 'concluded'}
      />
    </Dialog.Root>
  )
}
