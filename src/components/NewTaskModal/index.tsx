import * as Dialog from '@radix-ui/react-dialog'
import {
  CancelButton,
  DialogCloese,
  DialogContent,
  DialogOverlay,
  FlexArea,
  FormFooter,
  InputDate,
  InputPriority,
  InputTextArea,
  InputTitle,
  ModalHeader,
  NewTaskForm,
  SaveButton,
} from './styles'
import { X } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useCreateTask } from '../../hooks/useCreateTask'

const newTaskFieldsSchema = z.object({
  taskTitle: z.string(),
  taskPriority: z.string(),
  taskMaturity: z.string(),
  taskDescription: z.string(),
})

type typeFieldsSchema = z.infer<typeof newTaskFieldsSchema>

interface NewTaskModalProps {
  handleCloseModal: () => void
}

export function NewTaskModal({ handleCloseModal }: NewTaskModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<typeFieldsSchema>({
    resolver: zodResolver(newTaskFieldsSchema),
  })

  const { createNewTaks } = useCreateTask()

  const onSubmit = useCallback(
    async (data: typeFieldsSchema) => {
      try {
        createNewTaks(data)
        handleCloseModal()
        reset()
      } catch (err) {
        console.log(err)
      }
    },
    [createNewTaks, handleCloseModal, reset],
  )

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <ModalHeader>
          <Dialog.Title>📝 • Criar nova task</Dialog.Title>
          <DialogCloese>
            <X />
          </DialogCloese>
        </ModalHeader>
        <NewTaskForm onSubmit={handleSubmit(onSubmit)}>
          <InputTitle>
            Título:
            <input
              type="text"
              placeholder="Título"
              {...register('taskTitle')}
            />
          </InputTitle>
          <FlexArea>
            <InputPriority>
              Prioridade:
              <select {...register('taskPriority')}>
                <option value="normal">Normal</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </InputPriority>
            <InputDate>
              DeadLine:
              <input type="date" {...register('taskMaturity')} />
            </InputDate>
          </FlexArea>
          <InputTextArea>
            Descrição:
            <textarea {...register('taskDescription')} />
          </InputTextArea>
          <FormFooter>
            <Dialog.Close asChild>
              <CancelButton>Cancelar</CancelButton>
            </Dialog.Close>
            <SaveButton disabled={isSubmitting}>Criar</SaveButton>
          </FormFooter>
        </NewTaskForm>
      </DialogContent>
    </Dialog.Portal>
  )
}
