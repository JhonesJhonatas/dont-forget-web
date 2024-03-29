import {
  Calendar,
  CaretRight,
  CheckSquare,
  Circle,
  DotsThree,
  Folder,
  Lock,
  PlusCircle,
  SquaresFour,
} from '@phosphor-icons/react'
import {
  Container,
  NavContent,
  NavHeader,
  NavItem,
  NewTaskButton,
  ProjectController,
  ProjectItem,
  ProjectsArea,
  ProjectsContent,
  ProjectsHeader,
  ProjectsTitle,
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
import { ProjectsDropDown } from './components/ProjectsDropDown'
import defaultProfilePic from '../../assets/imgs/defaultProfilePic.svg'

export function NavBar() {
  const [open, setOpen] = useState(false)
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false)

  const { allProjects, userData } = useContext(TasksContext)

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
            <img src={defaultProfilePic} alt="Foto de Perfil" />
            <div>
              <UserName>{userData.name}</UserName>
              <UserEmail>{userData.email}</UserEmail>
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
            <NavLink to={'/my-week'}>
              <div>
                <Calendar size={18} />
                <span>Minha Semana</span>
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
          <ProjectsArea>
            <ProjectsHeader>
              <ProjectsTitle>
                <Folder weight="fill" />
                <span>Projetos</span>
              </ProjectsTitle>
              <Dialog.Root
                open={newProjectModalOpen}
                onOpenChange={setNewProjectModalOpen}
              >
                <Dialog.Trigger asChild>
                  <PlusCircle size={20} />
                </Dialog.Trigger>
                <NewProjectModal
                  handleCloseNewProjectModal={handleCloseNewProjectModal}
                />
              </Dialog.Root>
            </ProjectsHeader>
            <ProjectsContent>
              {allProjects.map((project) => {
                return (
                  <ProjectItem key={project.id} $projectColor={project.color}>
                    <NavLink to={`/tasks/${project.id}`}>
                      <Folder weight="fill" size={14} />
                      <span>{project.title}</span>
                      <Circle weight="fill" size={10} />
                    </NavLink>
                    <ProjectController>
                      <Lock size={14} alt="Projeto Privado" />
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <DotsThree size={24} />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <ProjectsDropDown projectId={project.id} />
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                    </ProjectController>
                  </ProjectItem>
                )
              })}
            </ProjectsContent>
          </ProjectsArea>
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
