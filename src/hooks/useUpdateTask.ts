import { useCallback, useContext } from 'react'
import { api } from '../lib/axios'
import { TaskContext } from '../contexts/TasksContext'
import { formatISO } from 'date-fns'

interface TaskToUpdateSchema {
  id: string
  description: string
  maturity: string
  priority: string
  status: string
  title: string
}

export const useUpdateTask = () => {
  const { handleUpdateTasks } = useContext(TaskContext)

  const updateTask = useCallback(
    ({
      id,
      description,
      maturity,
      priority,
      status,
      title,
    }: TaskToUpdateSchema) => {
      const formattedData = {
        description,
        maturity: formatISO(new Date(maturity)),
        priority,
        status,
        title,
      }

      api
        .put(`tasks/update-task-by-id/${id}`, formattedData)
        .finally(() => handleUpdateTasks())
    },
    [handleUpdateTasks],
  )

  return {
    updateTask,
  }
}
