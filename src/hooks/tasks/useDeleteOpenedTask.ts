import { useCallback } from 'react'
import { api } from '../../lib/axios'

interface DeleteOpenedTaskProps {
  id: string
  handleUpdateOpenedTasks: () => void
}

export const useDeleteOpenedTask = () => {
  const deleteOpenedTask = useCallback(
    async ({ id, handleUpdateOpenedTasks }: DeleteOpenedTaskProps) => {
      try {
        const deletedTask = await api.delete(
          `/tasks/delete-opened-task-by-id/${id}`,
        )

        if (deletedTask) {
          handleUpdateOpenedTasks()
          return true
        }
      } catch (err) {
        return false
      }
    },
    [],
  )

  return {
    deleteOpenedTask,
  }
}
