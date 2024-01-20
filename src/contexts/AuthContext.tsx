import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { api } from '../lib/axios'

interface HandleLogInProps {
  email: string
  password: string
}

interface AuthContextSchema {
  authenticated: boolean
  loading: boolean
  handleLogIn: ({ email, password }: HandleLogInProps) => Promise<boolean>
  handleLogOut: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

interface HandleRefreshTokenProps {
  currentToken: string
  email: string
}

const AuthContext = createContext({} as AuthContextSchema)

function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleRefreshToken = useCallback(
    async ({ currentToken, email }: HandleRefreshTokenProps) => {
      try {
        const {
          data: {
            token,
            user: { name },
          },
        } = await api.post('/users/refresh-token', { currentToken, email })

        if (token) {
          localStorage.setItem('token', token)
          localStorage.setItem('email', email)
          localStorage.setItem('name', name)
          api.defaults.headers.Authorization = `Bearer ${token}`
          setAuthenticated(true)
        }

        return true
      } catch (err) {
        return false
      }
    },
    [],
  )

  useEffect(() => {
    const currentToken = localStorage.getItem('token')
    const email = localStorage.getItem('email')

    if (currentToken && email) {
      handleRefreshToken({ currentToken, email })
    }

    setLoading(false)
  }, [handleRefreshToken])

  const handleLogIn = useCallback(
    async ({ email, password }: HandleLogInProps) => {
      try {
        const {
          data: {
            token,
            user: { name },
          },
        } = await api.post('/users/session', {
          email,
          password,
        })

        if (token) {
          localStorage.setItem('token', token)
          localStorage.setItem('email', email)
          localStorage.setItem('name', name)
          api.defaults.headers.Authorization = `Bearer ${token}`
          setAuthenticated(true)
        }

        return true
      } catch (err) {
        return false
      }
    },
    [],
  )

  const handleLogOut = useCallback(() => {
    setAuthenticated(false)
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    api.defaults.headers.Authorization = ''
  }, [])

  return (
    <AuthContext.Provider
      value={{ authenticated, loading, handleLogIn, handleLogOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
