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

export function NavBar() {
  return (
    <Container>
      <CardHedaer>
        <img src="https://github.com/jhonesjhonatas.png" alt="myPhoto" />
        <span>Jhones Jhonatas</span>
      </CardHedaer>
      <NavItemsArea>
        <NavItem>
          <NavLink to={'/settings'}>
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
          <NavLink to={'/settings'}>
            <div>
              <SignOut />
              <span>Sair</span>
            </div>
            <CaretRight />
          </NavLink>
        </NavItem>
      </NavItemsArea>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <NewTaskButton>
            Nova Task
            <PlusCircle />
          </NewTaskButton>
        </Dialog.Trigger>
        <NewTaskModal />
      </Dialog.Root>
    </Container>
  )
}
