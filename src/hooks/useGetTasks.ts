import { useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'

export interface TaskSchema {
  id: string
  createdAt: Date
  maturity: Date
  completedAt: Date
  title: string
  status: string
  priority: string
  description: string
  userId: string
}

export const useGetTasks = () => {
  const [allTasks, setAllTasks] = useState<TaskSchema[]>([])
  const [tasksIsLoading, setTasksIsLoading] = useState(false)

  const handleUpdateTasks = useCallback(() => {
    api
      .get('/tasks/get-all-tasks')
      .then((res) => {
        setTasksIsLoading(true)
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
