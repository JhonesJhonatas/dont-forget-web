import {
  CaretRight,
  CheckSquare,
  CircleDashed,
  DotsThree,
  Folder,
  PlusCircle,
  SquaresFour,
  UserCircle,
} from '@phosphor-icons/react'
import {
  Container,
  NavContent,
  NavHeader,
  NavItem,
  NewProject,
  NewTaskButton,
  ProjectItem,
  Section,
  UserEmail,
  UserInfos,
  UserName,
} from './styles'
import { NavLink } from 'react-router-dom'
import { useCallback, useContext, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { NewTaskModal } from '../NewTaskModal'
import { NewProjectModal } from '../NewProjectModal'
import { TasksContext } from '../../contexts/TaskContext'
import { UserOptionsDropDown } from './components/UserOptionsDropDown'

export function NavBar() {
  const [open, setOpen] = useState(false)
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false)

  const { allProjects } = useContext(TasksContext)

  const handleCloseModal = useCallback(() => {
    setOpen(false)
  }, [])

  const handleCloseNewProjectModal = useCallback(() => {
    setNewProjectModalOpen(false)
  }, [])

  return (
    <Container>
      <Section>
        <NavHeader>
          <UserInfos>
            <UserCircle size={38} />
            <div>
              <UserName>{localStorage.getItem('name')}</UserName>
              <UserEmail>{localStorage.getItem('email')}</UserEmail>
            </div>
          </UserInfos>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <DotsThree size={28} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <UserOptionsDropDown />
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </NavHeader>
        <NavContent>
          <NavItem>
            <NavLink to={'/dashboard'}>
              <div>
                <SquaresFour size={18} />
                <span>DashBoard</span>
              </div>
              <CaretRight />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={'/tasks/all'}>
              <div>
                <CheckSquare size={18} />
                <span>Todas as Tarefas</span>
              </div>
              <CaretRight />
            </NavLink>
          </NavItem>
          {allProjects.map((project) => {
            return (
              <ProjectItem key={project.id} $projectColor={project.color}>
                <NavLink to={`/tasks/${project.id}`}>
                  <div>
                    <Folder weight="fill" size={14} />
                    <span>{project.title}</span>
                  </div>
                  <CaretRight />
                </NavLink>
              </ProjectItem>
            )
          })}
          <Dialog.Root
            open={newProjectModalOpen}
            onOpenChange={setNewProjectModalOpen}
          >
            <Dialog.Trigger asChild>
              <NewProject>
                <div>
                  <CircleDashed size={14} />
                  <span>Novo Projeto</span>
                </div>
                <PlusCircle />
              </NewProject>
            </Dialog.Trigger>
            <NewProjectModal
              handleCloseNewProjectModal={handleCloseNewProjectModal}
            />
          </Dialog.Root>
        </NavContent>
      </Section>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <NewTaskButton>
            Nova Task
            <PlusCircle size={20} />
          </NewTaskButton>
        </Dialog.Trigger>
        <NewTaskModal handleCloseModal={handleCloseModal} />
      </Dialog.Root>
    </Container>
  )
}
