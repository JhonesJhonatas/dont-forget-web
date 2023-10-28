import { useCallback } from 'react'
import { api } from '../../lib/axios'

export const useDeleteOpenedTask = () => {
  const deleteOpenedTask = useCallback(async (id: string) => {
    try {
      const deletedTask = await api.delete(
        `/tasks/delete-opened-task-by-id/${id}`,
      )

      if (deletedTask) {
        return true
      }
    } catch (err) {
      return false
    }
  }, [])

  return {
    deleteOpenedTask,
  }
}
