import { Folder, Gear } from '@phosphor-icons/react'
import { DropDownContent, DropDownItem } from './styles'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

interface ProjectsDropDownProps {
  projectId: string
}

export function ProjectsDropDown({ projectId }: ProjectsDropDownProps) {
  const navigate = useNavigate()

  const handleNavigateTo = useCallback(
    (path: string) => {
      navigate(path)
    },
    [navigate],
  )

  return (
    <DropDownContent>
      <DropDownItem
        onClick={() => handleNavigateTo(`/project-viewer/${projectId}`)}
      >
        <Folder size={14} />
        <span>Visualizar Projeto</span>
      </DropDownItem>
      <DropDownItem
        onClick={() => handleNavigateTo(`/project-settings/${projectId}`)}
      >
        <Gear size={14} />
        <span>Configurações</span>
      </DropDownItem>
    </DropDownContent>
  )
}
