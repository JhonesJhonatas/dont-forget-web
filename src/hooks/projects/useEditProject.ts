import { useCallback } from 'react'
import { api } from '../../lib/axios'

interface EditProjectProps {
  id: string
  title: string
  description: string
  color: string
}

export const useEditProject = () => {
  const editProject = useCallback(
    async ({ color, description, id, title }: EditProjectProps) => {
      try {
        const editedProject = await api.put('/projects/edit-project', {
          color,
          description,
          id,
          title,
        })

        if (editedProject) {
          return true
        }
      } catch (err) {
        return false
      }
    },
    [],
  )

  return {
    editProject,
  }
}
