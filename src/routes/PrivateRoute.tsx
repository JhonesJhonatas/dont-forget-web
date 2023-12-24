import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export function PrivateRoute() {
  const { authenticated } = useContext(AuthContext)
  return authenticated ? <Outlet /> : <Navigate to="/" />
}
