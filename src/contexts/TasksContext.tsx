import React, { createContext } from 'react'
import { useGetTasks } from '../hooks/useGetTasks'

export interface TaskSchema {
  id: string
  createdAt: Date
  maturity: Date
  completedAt: Date
  title: string
  status:
    | 'opened'
    | 'stand_by'
    | 'in_progress'
    | 'approval'
    | 'payment'
    | 'concluded'
  priority: 'normal' | 'high' | 'urgent'
  description: string
  userId: string
}

interface TaskContextSchema {
  allTasksList: TaskSchema[]
  handleUpdateTasks: () => void
  tasksIsLoading: boolean
}

interface TaskContextProviderProps {
  children: React.ReactNode
}

export const TaskContext = createContext({} as TaskContextSchema)

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const {
    allTasks: allTasksList,
    handleUpdateTasks,
    tasksIsLoading,
  } = useGetTasks()

  return (
    <TaskContext.Provider
      value={{ allTasksList, handleUpdateTasks, tasksIsLoading }}
    >
      {children}
    </TaskContext.Provider>
  )
}
