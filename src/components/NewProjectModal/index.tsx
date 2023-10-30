import * as Dialog from '@radix-ui/react-dialog'
import {
  InputColor,
  DialogCloese,
  DialogContent,
  DialogOverlay,
  FlexArea,
  InputTitle,
  ModalContent,
  ModalHeader,
  ColorDemonstration,
  InputTextArea,
  FormFooter,
  CancelButton,
  SaveButton,
} from './styles'
import { Circle, X } from '@phosphor-icons/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useContext, useState } from 'react'
import { useCreateProject } from '../../hooks/projects/useCreateProject'
import { TasksContext } from '../../contexts/TaskContext'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChoseColorDropDown } from './ChoseColorDropDown'

const newProjectFormSchema = z.object({
  title: z.string(),
  description: z.string(),
})

type NewProjectFormSchema = z.infer<typeof newProjectFormSchema>

interface NewProjectModalProps {
  handleCloseNewProjectModal: () => void
}

export function NewProjectModal({
  handleCloseNewProjectModal,
}: NewProjectModalProps) {
  const [chosenColor, setChosenColor] = useState('#cbd5e1')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewProjectFormSchema>({
    resolver: zodResolver(newProjectFormSchema),
  })
  const { createNewProject } = useCreateProject()
  const { handleUpdateOpenedTasks } = useContext(TasksContext)

  const onSubmit = useCallback(
    async ({ description, title }: NewProjectFormSchema) => {
      const formattedData = {
        description,
        title,
        color: chosenColor,
      }

      const createdProject = await createNewProject(formattedData)

      if (createdProject) {
        handleUpdateOpenedTasks()
        handleCloseNewProjectModal()
      }
    },
    [
      chosenColor,
      createNewProject,
      handleCloseNewProjectModal,
      handleUpdateOpenedTasks,
    ],
  )

  const choseColor = useCallback((colorCode: string) => {
    setChosenColor(colorCode)
  }, [])

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <ModalHeader>
          <Dialog.Title>Novo Projeto</Dialog.Title>
          <DialogCloese>
            <X />
          </DialogCloese>
        </ModalHeader>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FlexArea>
              <InputTitle>
                Título:
                <input
                  type="text"
                  placeholder="Título"
                  {...register('title')}
                  required
                />
              </InputTitle>
              <InputColor>
                Cor:
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <ColorDemonstration $chosenColor={chosenColor}>
                      <Circle size={24} weight="fill" />
                    </ColorDemonstration>
                  </DropdownMenu.Trigger>
                  <ChoseColorDropDown choseColor={choseColor} />
                </DropdownMenu.Root>
              </InputColor>
            </FlexArea>
            <InputTextArea {...register('description')}>
              Informações:
              <textarea />
            </InputTextArea>
            <FormFooter>
              <Dialog.Close asChild>
                <CancelButton>Cancelar</CancelButton>
              </Dialog.Close>
              <SaveButton type="submit" disabled={isSubmitting}>
                Salvar
              </SaveButton>
            </FormFooter>
          </form>
        </ModalContent>
      </DialogContent>
    </Dialog.Portal>
  )
}
