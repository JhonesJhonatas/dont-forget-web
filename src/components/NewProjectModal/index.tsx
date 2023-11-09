import * as Dialog from '@radix-ui/react-dialog'
import {
  DialogContent,
  DialogOverlay,
  CancelButton,
  TaskTitleInput,
  ModalFooter,
  CreateTaskButton,
  TaskDescriptionInput,
  ModalContent,
  ColorPicker,
  FormContent,
  BoxColors,
} from './styles'
import { Folder } from '@phosphor-icons/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useCreateProject } from '../../hooks/projects/useCreateProject'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TasksContext } from '../../contexts/TaskContext'

interface NewProjectModalProps {
  handleCloseNewProjectModal: () => void
}

const createProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  color: z.string(),
})

type CreateProjectSchema = z.infer<typeof createProjectSchema>

export function NewProjectModal({
  handleCloseNewProjectModal,
}: NewProjectModalProps) {
  const [togleColorPicker, setTogleColorPicker] = useState(false)
  const [choosedColor, setChoosedColor] = useState('#3b82f6')

  const { createNewProject } = useCreateProject()
  const { handleUpdateProjects } = useContext(TasksContext)
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
  })

  useEffect(() => {
    setValue('color', choosedColor)
  }, [setValue, choosedColor])

  const handleTogleColorPicker = () => {
    setTogleColorPicker(!togleColorPicker)
  }

  const handleChoseColor = useCallback((colorHex: string) => {
    setChoosedColor(colorHex)
  }, [])

  const onSubmit = useCallback(
    async ({ color, description, title }: CreateProjectSchema) => {
      const projectCreated = await createNewProject({
        color,
        description,
        title,
      })

      if (projectCreated) {
        handleCloseNewProjectModal()
        handleUpdateProjects()
        reset()
      }
    },
    [createNewProject, handleCloseNewProjectModal, handleUpdateProjects, reset],
  )

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <FormContent>
              <TaskTitleInput
                type="text"
                placeholder="Nome do Projeto/Cliente"
                {...register('title')}
                required
              />
              <TaskDescriptionInput
                rows={15}
                placeholder="Adicione uma descrição"
                {...register('description')}
              />
            </FormContent>
            <ColorPicker>
              <Folder
                weight="fill"
                size={24}
                color={choosedColor}
                onClick={() => handleTogleColorPicker()}
              />
              <BoxColors $isOpen={togleColorPicker}>
                <Folder
                  weight="fill"
                  onClick={() => {
                    handleChoseColor('#ef4444')
                    setTogleColorPicker(false)
                  }}
                  size={18}
                  color="#ef4444"
                />
                <Folder
                  weight="fill"
                  onClick={() => {
                    handleChoseColor('#f97316')
                    setTogleColorPicker(false)
                  }}
                  size={18}
                  color="#f97316"
                />
                <Folder
                  weight="fill"
                  onClick={() => {
                    handleChoseColor('#eab308')
                    setTogleColorPicker(false)
                  }}
                  size={18}
                  color="#eab308"
                />
                <Folder
                  weight="fill"
                  onClick={() => {
                    handleChoseColor('#22c55e')
                    setTogleColorPicker(false)
                  }}
                  size={18}
                  color="#22c55e"
                />
                <Folder
                  weight="fill"
                  onClick={() => {
                    handleChoseColor('#06b6d4')
                    setTogleColorPicker(false)
                  }}
                  size={18}
                  color="#06b6d4"
                />
                <Folder
                  weight="fill"
                  onClick={() => {
                    handleChoseColor('#3b82f6')
                    setTogleColorPicker(false)
                  }}
                  size={18}
                  color="#3b82f6"
                />
                <Folder
                  weight="fill"
                  onClick={() => {
                    handleChoseColor('#a855f7')
                    setTogleColorPicker(false)
                  }}
                  size={18}
                  color="#a855f7"
                />
                <Folder
                  weight="fill"
                  onClick={() => {
                    handleChoseColor('#ec4899')
                    setTogleColorPicker(false)
                  }}
                  size={18}
                  color="#ec4899"
                />
              </BoxColors>
            </ColorPicker>
          </ModalContent>
          <ModalFooter>
            <CancelButton onClick={() => handleCloseNewProjectModal()}>
              Cancelar
            </CancelButton>
            <CreateTaskButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Criando Projeto' : 'Criar Projeto'}
            </CreateTaskButton>
          </ModalFooter>
        </form>
      </DialogContent>
    </Dialog.Portal>
  )
}
