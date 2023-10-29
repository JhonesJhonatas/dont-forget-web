import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { AuthContext } from './AuthContext'
import { api } from '../lib/axios'

export interface OpenedTask {
  id: string
  title: string
  description: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  status:
    | 'toDo'
    | 'standby'
    | 'inProgress'
    | 'approval'
    | 'payment'
    | 'concluded'
  maturity: string
  createdAt: string
  projectId: string
  userId: string
}

interface TasksContextSchema {
  openedTasksIsLoading: boolean
  allOpenedTasks: OpenedTask[]
  handleUpdateOpenedTasks: () => void
}

interface TaskProviderProps {
  children: ReactNode
}

const TasksContext = createContext({} as TasksContextSchema)

function TasksProvider({ children }: TaskProviderProps) {
  const [openedTasksIsLoading, setOpenedTasksIsLoading] = useState(true)
  const [allOpenedTasks, setAllOpenedTasks] = useState<OpenedTask[]>([])
  const { authenticated } = useContext(AuthContext)

  const handleUpdateOpenedTasks = useCallback(() => {
    setOpenedTasksIsLoading(true)
    api
      .get('/tasks/list-all-opened-tasks-by-user-id')
      .then((res) => setAllOpenedTasks(res.data))
      .finally(() => setOpenedTasksIsLoading(false))
  }, [])

  useEffect(() => {
    if (authenticated) {
      handleUpdateOpenedTasks()
    }
  }, [authenticated, handleUpdateOpenedTasks])

  return (
    <TasksContext.Provider
      value={{ allOpenedTasks, openedTasksIsLoading, handleUpdateOpenedTasks }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export { TasksContext, TasksProvider }
