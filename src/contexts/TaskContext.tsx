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
import { addWeeks, endOfWeek, format, startOfWeek } from 'date-fns'

interface DefaultUserDataSchema {
  name: string
  email: string
  role: string
  birthDate: string
  confirmedEmail: boolean
}

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
  maturity?: string
  createdAt: string
  projectId: string
  userId: string
}

export interface ConcludedTask {
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
  maturity?: string
  createdAt: string
  completedAt: string
  projectId: string
  userId: string
}

interface TasksOfWeekSchema {
  monday: OpenedTask[]
  tuesday: OpenedTask[]
  wednesday: OpenedTask[]
  thursday: OpenedTask[]
  friday: OpenedTask[]
  saturday: OpenedTask[]
  sunday: OpenedTask[]
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
  userData: DefaultUserDataSchema
  userDataIsLoading: boolean
  handleUpdateUserData: () => void
  tasksOfWeek: TasksOfWeekSchema
  tasksIsLoading: boolean
  handleUpdateTasksOfWeek: () => void
  handleNextWeek: () => void
  handlePreviousWeek: () => void
  handleCurrentWeek: () => void
}

interface TaskProviderProps {
  children: ReactNode
}
const TasksContext = createContext({} as TasksContextSchema)

function TasksProvider({ children }: TaskProviderProps) {
  const [userDataIsLoading, setUserDataIsLoading] = useState(false)
  const [userData, setUserData] = useState({} as DefaultUserDataSchema)
  const [projectsIsLoading, setProjectsIsLoading] = useState(true)
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [concludedTasksIsLoading, setConcludedTasksIsLoading] = useState(true)
  const [allConcludedTasks, setAllConcludedTasks] = useState<ConcludedTask[]>(
    [],
  )
  const [openedTasksIsLoading, setOpenedTasksIsLoading] = useState(true)
  const [allOpenedTasks, setAllOpenedTasks] = useState<OpenedTask[]>([])
  const [tasksOfWeek, setTasksOfWeek] = useState<TasksOfWeekSchema>({
    monday: [],
    thursday: [],
    wednesday: [],
    tuesday: [],
    friday: [],
    saturday: [],
    sunday: [],
  })
  const [tasksIsLoading, setTasksIsLoading] = useState(false)
  const [currentStartDate, setCurrentStartDate] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  )
  const [currentEndDate, setCurrentEndDate] = useState(
    endOfWeek(new Date(), { weekStartsOn: 1 }),
  )

  const { authenticated } = useContext(AuthContext)

  const handleUpdateUserData = useCallback(() => {
    if (authenticated) {
      setUserDataIsLoading(true)
      api
        .get('/users/get-user-data')
        .then((response) => setUserData(response.data))
        .finally(() => setUserDataIsLoading(false))
    }
  }, [authenticated])

  useEffect(() => {
    handleUpdateUserData()
  }, [handleUpdateUserData])

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

  const handleUpdateTasksOfWeek = useCallback(() => {
    setTasksIsLoading(true)

    api
      .get('/tasks/get-opened-tasks-by-week/', {
        params: {
          startDate: new Date(format(currentStartDate, 'MM-dd-yyyy')),
          endDate: new Date(format(currentEndDate, 'MM-dd-yyyy')),
        },
      })
      .then((response) => setTasksOfWeek(response.data))
      .finally(() => setTasksIsLoading(false))
  }, [currentEndDate, currentStartDate])

  useEffect(() => {
    if (authenticated) {
      handleUpdateTasksOfWeek()
    }
  }, [authenticated, handleUpdateTasksOfWeek])

  const handleNextWeek = useCallback(() => {
    setCurrentStartDate((prevDate) => addWeeks(prevDate, 1))
    setCurrentEndDate((prevDate) => addWeeks(prevDate, 1))
  }, [])

  const handlePreviousWeek = useCallback(() => {
    setCurrentStartDate((prevDate) => addWeeks(prevDate, -1))
    setCurrentEndDate((prevDate) => addWeeks(prevDate, -1))
  }, [])

  const handleCurrentWeek = useCallback(() => {
    setCurrentStartDate(() => startOfWeek(new Date(), { weekStartsOn: 1 }))
    setCurrentEndDate(() => endOfWeek(new Date(), { weekStartsOn: 1 }))
  }, [])

  return (
    <TasksContext.Provider
      value={{
        userData,
        userDataIsLoading,
        handleUpdateUserData,
        allOpenedTasks,
        openedTasksIsLoading,
        handleUpdateOpenedTasks,
        allProjects,
        handleUpdateProjects,
        projectsIsLoading,
        allConcludedTasks,
        concludedTasksIsLoading,
        handleUpdateCompletedTasks,
        tasksOfWeek,
        tasksIsLoading,
        handleUpdateTasksOfWeek,
        handleNextWeek,
        handlePreviousWeek,
        handleCurrentWeek,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export { TasksContext, TasksProvider }
