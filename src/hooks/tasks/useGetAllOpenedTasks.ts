import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/axios'

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

export const useGetAllOpenedTasks = () => {
  const [openedTasksIsLoading, setOpenedTasksIsLoading] = useState(true)
  const [allOpenedTasks, setAllOpenedTasks] = useState<OpenedTask[]>([])

  const handleUpdateOpenedTasks = useCallback(() => {
    setOpenedTasksIsLoading(true)
    api
      .get('/tasks/list-all-opened-tasks-by-user-id')
      .then((res) => setAllOpenedTasks(res.data))
      .finally(() => setOpenedTasksIsLoading(false))
  }, [])

  useEffect(() => {
    handleUpdateOpenedTasks()
  }, [handleUpdateOpenedTasks])

  return {
    openedTasksIsLoading,
    allOpenedTasks,
    handleUpdateOpenedTasks,
  }
}
