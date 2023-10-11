import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DropDownContent } from './styles'

export function UserOptionsDropDown() {
  return (
    <DropDownContent>
      <DropdownMenu.Item>
        <span>Configurações</span>
      </DropdownMenu.Item>
      <DropdownMenu.Item>Sair</DropdownMenu.Item>
    </DropDownContent>
  )
}
