import { Pen, Trash } from '@phosphor-icons/react'
import { DropDownContent, DropDownItem } from './styles'
import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../contexts/AuthContext'

export function ProjectsDropDown() {
  const navigate = useNavigate()

  const { handleLogOut } = useContext(AuthContext)

  const handleSignOut = useCallback(() => {
    handleLogOut()
    navigate('/')
  }, [handleLogOut, navigate])

  const handleNavigateTo = useCallback(
    (route: string) => {
      navigate(route)
    },
    [navigate],
  )

  return (
    <DropDownContent>
      <DropDownItem onClick={() => handleNavigateTo('/settings')}>
        <Pen size={14} />
        <span>Editar</span>
      </DropDownItem>
      <DropDownItem onClick={handleSignOut}>
        <Trash size={14} />
        <span>Excluir</span>
      </DropDownItem>
    </DropDownContent>
  )
}
