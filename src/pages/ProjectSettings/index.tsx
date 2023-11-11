import { useNavigate, useParams } from 'react-router-dom'
import {
  CancelButton,
  ColorPicker,
  Container,
  EditProjectArea,
  EditProjectInputs,
  ExcludeProjectButton,
  FormFooter,
  SubmitButton,
  TaskDescriptionInput,
  TaskTitleInput,
  TitleAndColor,
} from './styles'
import { useGetProjectById } from '../../hooks/projects/useGetProjectById'
import { useForm } from 'react-hook-form'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Folder, Trash } from '@phosphor-icons/react'
import { ProjectColorPicker } from '../../components/ProjectColorPicker'
import { useDeleteProject } from '../../hooks/projects/useDeleteProjec'
import { TasksContext } from '../../contexts/TaskContext'
import { useEditProject } from '../../hooks/projects/useEditProject'
import { useNotify } from '../../hooks/useNotify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type RouterParams = {
  projectId: string
}

export function ProjectSettings() {
  const [togleColorPicker, setTogleColorPicker] = useState(false)
  const [choosedColor, setChoosedColor] = useState('')

  const { projectId } = useParams<RouterParams>()

  const capturedProjectId = projectId || ''

  const { register, setValue, handleSubmit, getValues } = useForm()
  const { project } = useGetProjectById(capturedProjectId)
  const { deleteProject } = useDeleteProject()
  const { handleUpdateProjects } = useContext(TasksContext)
  const { editProject } = useEditProject()
  const navigate = useNavigate()
  const { notify } = useNotify()

  const handleResetForm = useCallback(() => {
    setValue('title', project?.title)
    setValue('description', project?.description)
    setChoosedColor(project?.color || '')
  }, [project?.color, project?.description, project?.title, setValue])

  useEffect(() => {
    handleResetForm()
  }, [handleResetForm])

  const handleChoseColor = useCallback((colorHex: string) => {
    setChoosedColor(colorHex)
  }, [])

  const handleEditProject = useCallback(async () => {
    const editedProject = await editProject({
      color: choosedColor,
      description: getValues('description'),
      id: capturedProjectId,
      title: getValues('title'),
    })

    if (editedProject) {
      handleUpdateProjects()
      notify({ type: 'sucess', message: 'Projeto Editado Com Sucesso' })
    }
  }, [
    capturedProjectId,
    choosedColor,
    editProject,
    getValues,
    handleUpdateProjects,
    notify,
  ])

  const handleTogleColorPicker = () => {
    setTogleColorPicker(!togleColorPicker)
  }

  const handleDeleteProject = useCallback(async () => {
    const deletedProject = await deleteProject(capturedProjectId)

    if (deletedProject) {
      navigate('/dashboard')
      handleUpdateProjects()
    }
  }, [capturedProjectId, deleteProject, handleUpdateProjects, navigate])

  return (
    <>
      <Container>
        <EditProjectArea>
          <form onSubmit={handleSubmit(handleEditProject)}>
            <EditProjectInputs>
              <TitleAndColor>
                <ColorPicker>
                  <Folder
                    weight="fill"
                    color={choosedColor}
                    size={24}
                    onClick={handleTogleColorPicker}
                  />
                  <ProjectColorPicker
                    handleChoseColor={handleChoseColor}
                    setTogleColorPicker={setTogleColorPicker}
                    togleColorPicker={togleColorPicker}
                  />
                </ColorPicker>
                <TaskTitleInput
                  type="text"
                  placeholder="Nome do Projeto/Cliente"
                  {...register('title')}
                  required
                />
              </TitleAndColor>
              <TaskDescriptionInput
                rows={6}
                placeholder="Adicione uma descrição"
                {...register('description')}
              />
            </EditProjectInputs>
            <FormFooter>
              <CancelButton type="button" onClick={handleResetForm}>
                Cancelar Alterações
              </CancelButton>
              <SubmitButton type="submit">Salvar Alterações</SubmitButton>
            </FormFooter>
          </form>
        </EditProjectArea>
        <ExcludeProjectButton onClick={handleDeleteProject}>
          <div>
            <Trash size={20} />
            <span>Excluir Projeto</span>
          </div>
          <span>
            Isso exluirá o projeto e todas as tarefas relacionadas a ele.
          </span>
        </ExcludeProjectButton>
      </Container>
      <ToastContainer />
    </>
  )
}
