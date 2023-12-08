import { useCallback } from 'react'
import { z } from 'zod'
import { api } from '../../lib/axios'

const createUserFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  birthDate: z.string(),
  password: z.string(),
  projectName: z.string(),
  projectColor: z.string(),
  projectDescription: z.string(),
})

type CreateUserFormSchema = z.infer<typeof createUserFormSchema>

const useCreateUser = () => {
  const createNewUser = useCallback(
    async ({
      email,
      name,
      password,
      role,
      birthDate,
      projectName,
      projectColor,
      projectDescription,
    }: CreateUserFormSchema) => {
      try {
        await api.post('/users/create-user', {
          email,
          name,
          password,
          role,
          birthDate: new Date(birthDate),
          projectName,
          projectColor,
          projectDescription,
        })

        return true
      } catch (err) {
        return false
      }
    },
    [],
  )

  return {
    createNewUser,
  }
}

export { useCreateUser }
