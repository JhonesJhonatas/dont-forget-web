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

export interface Project {
  id: string
  title: string
  description: string
  color: string
  createdAt: string
  userId: string
}

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

export interface ConcludedTask {
  id: string
  title: string
  description: string
  priority: string
  status: string
  maturity: string
  createdAt: string
  completedAt: string
  projectId: string
  userId: string
}

interface TasksContextSchema {
  openedTasksIsLoading: boolean
  allOpenedTasks: OpenedTask[]
  handleUpdateOpenedTasks: () => void
  projectsIsLoading: boolean
  allProjects: Project[]
  handleUpdateProjects: () => void
  concludedTasksIsLoading: boolean
  allConcludedTasks: ConcludedTask[]
  handleUpdateCompletedTasks: () => void
}

interface TaskProviderProps {
  children: ReactNode
}

const TasksContext = createContext({} as TasksContextSchema)

function TasksProvider({ children }: TaskProviderProps) {
  const [projectsIsLoading, setProjectsIsLoading] = useState(true)
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [concludedTasksIsLoading, setConcludedTasksIsLoading] = useState(true)
  const [allConcludedTasks, setAllConcludedTasks] = useState<ConcludedTask[]>(
    [],
  )
  const [openedTasksIsLoading, setOpenedTasksIsLoading] = useState(true)
  const [allOpenedTasks, setAllOpenedTasks] = useState<OpenedTask[]>([])

  const { authenticated } = useContext(AuthContext)

  const handleUpdateProjects = useCallback(() => {
    setProjectsIsLoading(true)
    api
      .get('/projects/list-projects')
      .then((res) => setAllProjects(res.data))
      .finally(() => setProjectsIsLoading(false))
  }, [])

  const handleUpdateOpenedTasks = useCallback(() => {
    setOpenedTasksIsLoading(true)
    api
      .get('/tasks/list-all-opened-tasks-by-user-id')
      .then((res) => setAllOpenedTasks(res.data))
      .finally(() => setOpenedTasksIsLoading(false))
  }, [])

  const handleUpdateCompletedTasks = useCallback(() => {
    setConcludedTasksIsLoading(true)
    api
      .get('/tasks/list-all-concluded-tasks-by-user-id')
      .then((res) => setAllConcludedTasks(res.data))
      .finally(() => setConcludedTasksIsLoading(false))
  }, [])

  useEffect(() => {
    if (authenticated) {
      handleUpdateProjects()
    }
  }, [authenticated, handleUpdateProjects])

  useEffect(() => {
    if (authenticated) {
      handleUpdateOpenedTasks()
      handleUpdateCompletedTasks()
    }
  }, [authenticated, handleUpdateCompletedTasks, handleUpdateOpenedTasks])

  return (
    <TasksContext.Provider
      value={{
        allOpenedTasks,
        openedTasksIsLoading,
        handleUpdateOpenedTasks,
        allProjects,
        handleUpdateProjects,
        projectsIsLoading,
        allConcludedTasks,
        concludedTasksIsLoading,
        handleUpdateCompletedTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export { TasksContext, TasksProvider }
