import {
  CaretRight,
  CheckSquare,
  Gear,
  PlusCircle,
  SignOut,
  SquaresFour,
} from '@phosphor-icons/react'
import {
  CardHedaer,
  Container,
  NavItem,
  NavItemsArea,
  NewTaskButton,
} from './styles'
import { NavLink } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTaskModal } from '../NewTaskModal'
import { useCallback, useState } from 'react'

export function NavBar() {
  const [open, setOpen] = useState(false)

  const handleCloseModal = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Container>
      <CardHedaer>
        <img src="https://github.com/jhonesjhonatas.png" alt="myPhoto" />
        <span>Jhones Jhonatas</span>
      </CardHedaer>
      <NavItemsArea>
        <NavItem>
          <NavLink to={'/dashboard'}>
            <div>
              <SquaresFour />
              <span>DashBoard</span>
            </div>
            <CaretRight />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={'/all-tasks'}>
            <div>
              <CheckSquare />
              <span>Tasks</span>
            </div>
            <CaretRight />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={'/settings'}>
            <div>
              <Gear />
              <span>Configurações</span>
            </div>
            <CaretRight />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={'/'}>
            <div>
              <SignOut />
              <span>Sair</span>
            </div>
            <CaretRight />
          </NavLink>
        </NavItem>
      </NavItemsArea>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <NewTaskButton>
            Nova Task
            <PlusCircle />
          </NewTaskButton>
        </Dialog.Trigger>
        <NewTaskModal handleCloseModal={handleCloseModal} />
      </Dialog.Root>
    </Container>
  )
}
