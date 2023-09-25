import { useCallback, useContext } from 'react'
import { api } from '../lib/axios'
import { TaskContext } from '../contexts/TasksContext'

export const useDeleteTask = () => {
  const { handleUpdateTasks } = useContext(TaskContext)

  const deleteTaskById = useCallback(
    async (taskId: string) => {
      api
        .delete(`tasks/delete-task-by-id/${taskId}`)
        .then(() => handleUpdateTasks())
    },
    [handleUpdateTasks],
  )

  return {
    deleteTaskById,
  }
}
