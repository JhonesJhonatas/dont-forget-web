import { useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'

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

export const useGetTasks = () => {
  const [allTasks, setAllTasks] = useState<TaskSchema[]>([])
  const [tasksIsLoading, setTasksIsLoading] = useState(false)

  const handleUpdateTasks = useCallback(() => {
    setTasksIsLoading(true)
    api
      .get('/tasks/get-all-tasks')
      .then((res) => {
        setAllTasks(res.data)
      })
      .finally(() => {
        setTasksIsLoading(false)
      })
  }, [])

  useEffect(() => {
    handleUpdateTasks()
  }, [handleUpdateTasks])

  return {
    allTasks,
    tasksIsLoading,
    handleUpdateTasks,
  }
}
