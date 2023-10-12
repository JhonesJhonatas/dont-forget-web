import { Gear, SignOut } from '@phosphor-icons/react'
import { DropDownContent, DropDownItem } from './styles'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function UserOptionsDropDown() {
  const navigate = useNavigate()

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
      <DropDownItem onClick={() => handleNavigateTo('/')}>
        <SignOut size={20} />
        <span>Sair</span>
      </DropDownItem>
    </DropDownContent>
  )
}
