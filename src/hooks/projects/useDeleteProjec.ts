import { useCallback } from 'react'
import { api } from '../../lib/axios'

export const useDeleteProject = () => {
  const deleteProject = useCallback(async (projectId: string) => {
    try {
      const deletedProject = await api.delete(
        `/projects/delete-project/${projectId}`,
      )

      if (deletedProject) {
        return true
      }
    } catch (err) {
      return false
    }
  }, [])

  return {
    deleteProject,
  }
}
