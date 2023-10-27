import { useCallback } from 'react'
import { api } from '../lib/axios'

interface AuthenticateProps {
  email: string
  password: string
}

export const useAuthenticate = () => {
  const authenticate = useCallback(
    async ({ email, password }: AuthenticateProps) => {
      try {
        const userAuthenticated = await api.post('/users/session', {
          email,
          password,
        })

        localStorage.setItem('token', userAuthenticated.data.token)

        return true
      } catch (err) {
        return false
      }
    },
    [],
  )

  return { authenticate }
}
