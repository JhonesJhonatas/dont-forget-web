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

const AuthContext = createContext({} as AuthContextSchema)

function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }

    setLoading(false)
  }, [])

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
          localStorage.setItem('token', JSON.stringify(token))
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
