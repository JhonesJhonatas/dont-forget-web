import { useCallback } from 'react'
import { z } from 'zod'
import { api } from '../../lib/axios'

const createUserFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  color: z.string(),
})

type CreateUserFormSchema = z.infer<typeof createUserFormSchema>

const useCreateProject = () => {
  const createNewProject = useCallback(
    async ({ title, description, color }: CreateUserFormSchema) => {
      try {
        const projectCreated = await api.post('/projects/create-project', {
          title,
          description,
          color,
        })

        return projectCreated
      } catch (err) {
        return false
      }
    },
    [],
  )

  return {
    createNewProject,
  }
}

export { useCreateProject }
