import { useCallback } from 'react'
import { z } from 'zod'
import { api } from '../../lib/axios'

const createUserFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  password: z.string(),
})

type CreateUserFormSchema = z.infer<typeof createUserFormSchema>

const useCreateUser = () => {
  const createNewUser = useCallback(
    async ({ email, name, password, role }: CreateUserFormSchema) => {
      try {
        await api.post('/users/create-user', {
          email,
          name,
          password,
          role,
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
