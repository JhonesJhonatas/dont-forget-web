import { Gear, SignOut } from '@phosphor-icons/react'
import { DropDownContent, DropDownItem } from './styles'
import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../contexts/AuthContext'

export function UserOptionsDropDown() {
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
        <Gear size={20} />
        <span>Configurações</span>
      </DropDownItem>
      <DropDownItem onClick={handleSignOut}>
        <SignOut size={20} />
        <span>Sair</span>
      </DropDownItem>
    </DropDownContent>
  )
}
