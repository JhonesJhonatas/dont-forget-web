import {
  ArrowSquareOut,
  Calendar,
  Circle,
  Flag,
  Folder,
} from '@phosphor-icons/react'
import {
  CardElements,
  CardHeader,
  CardTitle,
  Container,
  CustomDropDown,
  Maturity,
  Priority,
  PriorityOption,
  ProjectInformations,
  Status,
  StatusOption,
} from './styles'
import { format } from 'date-fns'
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
  status: string
  maturity: string
  createdAt: string
  completedAt?: string
  projectId: string
  userId: string
}

interface TaskCardProps {
  task: Task
  handleUpdateTasksOfWeek: () => void
}

export function TaskCard({ task, handleUpdateTasksOfWeek }: TaskCardProps) {
  const [togleModalEdit, setTogleModalEdit] = useState(false)
  const [statusDropDownIsOpen, setStatusDropDownIsOpen] = useState(false)
  const [priorityDropDownIsOpen, setPriorityDropDownIsOpen] = useState(false)

  const { allProjects, handleUpdateCompletedTasks, handleUpdateOpenedTasks } =
    useContext(TasksContext)

  const statusDropDownRef = useRef<HTMLDivElement>(null)
  const toggleStatusRef = useRef<HTMLDivElement>(null)
  const priorityDropDownRef = useRef<HTMLDivElement | null>(null)
  const togglePriorityRef = useRef<HTMLDivElement | null>(null)

  const formattedMaturity = format(new Date(task.maturity), 'dd/MM/yyyy')

  const projectInformations = allProjects.find((project) => {
    return project.id === task.projectId
  })

  const handleTogleModal = useCallback(() => {
    setTogleModalEdit(false)
  }, [])

  const handleToggleStatusDropDown = useCallback(() => {
    setStatusDropDownIsOpen((prevValue) => !prevValue)
  }, [])

  const handleTogglePriorityDropDown = useCallback(() => {
    setPriorityDropDownIsOpen((prevValue) => !prevValue)
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
      <Container>
        <ProjectInformations>
          <span>
            <Folder />
            {projectInformations?.title}
          </span>
          <Dialog.Trigger asChild>
            <ArrowSquareOut />
          </Dialog.Trigger>
        </ProjectInformations>
        <CardHeader>
          <Dialog.Trigger asChild>
            <CardTitle>{task.title}</CardTitle>
          </Dialog.Trigger>
        </CardHeader>
        <CardElements>
          <Status
            $status={task.status}
            ref={toggleStatusRef}
            onClick={handleToggleStatusDropDown}
          >
            <Circle size={12} weight="fill" />
          </Status>
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
          <Priority
            ref={togglePriorityRef}
            onClick={handleTogglePriorityDropDown}
            $level={task.priority}
          >
            <Flag size={10} weight="fill" />
          </Priority>
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
          <Maturity>
            <Calendar size={10} />
            <span>{formattedMaturity}</span>
          </Maturity>
        </CardElements>
      </Container>

      <EditTaskModal
        task={task}
        handleCloseModal={handleTogleModal}
        isTaskConcluded={task.status === 'concluded'}
      />
    </Dialog.Root>
  )
}
