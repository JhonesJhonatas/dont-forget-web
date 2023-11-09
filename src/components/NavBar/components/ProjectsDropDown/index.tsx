import { Pen, Trash } from '@phosphor-icons/react'
import { DropDownContent, DropDownItem } from './styles'
import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteProject } from '../../../../hooks/projects/useDeleteProjec'
import { TasksContext } from '../../../../contexts/TaskContext'

interface ProjectsDropDownProps {
  projectId: string
}

export function ProjectsDropDown({ projectId }: ProjectsDropDownProps) {
  const navigate = useNavigate()

  const { deleteProject } = useDeleteProject()
  const {
    handleUpdateProjects,
    handleUpdateCompletedTasks,
    handleUpdateOpenedTasks,
  } = useContext(TasksContext)

  const handleDeleteProject = useCallback(
    async (projectId: string) => {
      const deletedProjects = await deleteProject(projectId)

      if (deletedProjects) {
        handleUpdateProjects()
        handleUpdateCompletedTasks()
        handleUpdateOpenedTasks()
      }
    },
    [
      deleteProject,
      handleUpdateCompletedTasks,
      handleUpdateOpenedTasks,
      handleUpdateProjects,
    ],
  )

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
      <DropDownItem onClick={() => handleDeleteProject(projectId)}>
        <Trash size={14} />
        <span>Excluir</span>
      </DropDownItem>
    </DropDownContent>
  )
}
