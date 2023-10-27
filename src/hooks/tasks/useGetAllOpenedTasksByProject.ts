import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/axios'

interface UseGetAllOpenedTasksByProjectProps {
  projectId: string
}

interface OpenedTask {
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

export const useGetAllOpenedTasksByProject = ({
  projectId,
}: UseGetAllOpenedTasksByProjectProps) => {
  const [openedTasksIsLoading, setOpenedTasksIsLoading] = useState(true)
  const [allOpenedTasks, setAllOpenedTasks] = useState<OpenedTask[]>([])

  const handleUpdateOpenedTasks = useCallback(() => {
    setOpenedTasksIsLoading(true)
    api
      .get(`/tasks/list-opened-tasks-by-project-id/${projectId}`)
      .then((res) => setAllOpenedTasks(res.data))
      .finally(() => setOpenedTasksIsLoading(false))
  }, [projectId])

  useEffect(() => {
    handleUpdateOpenedTasks()
  }, [handleUpdateOpenedTasks])

  return {
    openedTasksIsLoading,
    allOpenedTasks,
    handleUpdateOpenedTasks,
  }
}
