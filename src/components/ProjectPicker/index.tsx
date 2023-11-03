import { Folder } from '@phosphor-icons/react'
import { Container } from './styles'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Project, TasksContext } from '../../contexts/TaskContext'

export function ProjectPicker() {
  const [choosedProject, setChoosedProject] = useState<Project>()

  const { allProjects } = useContext(TasksContext)

  const handleChooseProject = useCallback(
    (projectId: string) => {
      const choosedProject = allProjects.find(
        (project) => project.id === projectId,
      )

      setChoosedProject(choosedProject)
    },
    [allProjects],
  )

  useEffect(() => {
    setChoosedProject(allProjects[0])
  }, [allProjects])

  return (
    <Container $projectColor={choosedProject?.color}>
      <Folder weight="fill" />
      <span>{choosedProject?.title}</span>
    </Container>
  )
}
