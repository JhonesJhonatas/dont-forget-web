import { CaretDown, CaretUp, Folder } from '@phosphor-icons/react'
import {
  ChoosedField,
  Container,
  ListOfOptions,
  OptionsField,
  SelectorControllers,
  SelectorField,
} from './styles'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Project, TasksContext } from '../../contexts/TaskContext'

interface ProjectPickerProps {
  handleSelectProject: (data: Project) => void
  initialValue?: Project
}

export function ProjectPicker({
  handleSelectProject,
  initialValue,
}: ProjectPickerProps) {
  const [togleOptions, setTogleOptions] = useState(false)
  const [choosedOption, setChoosedOption] = useState<Project>()

  const { allProjects } = useContext(TasksContext)

  useEffect(() => {
    if (initialValue) {
      setChoosedOption(initialValue)
      handleSelectProject(initialValue)
    } else {
      setChoosedOption(allProjects[0])
      handleSelectProject(allProjects[0])
    }
  }, [allProjects, handleSelectProject, initialValue])

  const handleTogleOptions = () => {
    setTogleOptions(!togleOptions)
  }

  const handleChoseOption = useCallback(
    ({ color, createdAt, description, id, title, userId }: Project) => {
      setChoosedOption({ color, createdAt, description, id, title, userId })
      handleSelectProject({ color, createdAt, description, id, title, userId })
    },
    [handleSelectProject],
  )

  return (
    <Container>
      <SelectorField onClick={() => handleTogleOptions()}>
        <ChoosedField>
          <Folder weight="fill" color={choosedOption?.color} />
          <span>{choosedOption?.title}</span>
        </ChoosedField>
        <SelectorControllers>
          {togleOptions ? <CaretUp /> : <CaretDown />}
        </SelectorControllers>
      </SelectorField>

      <OptionsField $isOpen={togleOptions}>
        <ListOfOptions>
          {allProjects.map((project) => {
            return (
              <li
                key={project.id}
                onClick={() => {
                  handleChoseOption(project)
                  handleTogleOptions()
                }}
              >
                <Folder weight="fill" color={project.color} />
                <span>{project.title}</span>
              </li>
            )
          })}
        </ListOfOptions>
      </OptionsField>
    </Container>
  )
}
