import { X } from '@phosphor-icons/react'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCallback, useEffect } from 'react'
import { useCreateTask } from '../../hooks/useCreateTask'

const tasksFieldsSchema = z.object({
  taskTitle: z.string(),
  taskPriority: z.string(),
  taskMaturity: z.string(),
  taskDescription: z.string(),
})

type typeFieldsSchema = z.infer<typeof tasksFieldsSchema>

interface EditTaskModalProps {
  task: {
    taskTitle: string
    taskPriority: string
    taskMaturity: Date
    taskDescription: string
  }
}

export function EditTaskModal({ task }: EditTaskModalProps) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<typeFieldsSchema>({
    resolver: zodResolver(tasksFieldsSchema),
  })

  const { createNewTaks } = useCreateTask()

  useEffect(() => {
    setValue('taskTitle', task.taskTitle)
    setValue('taskPriority', task.taskPriority)
    setValue('taskDescription', task.taskDescription)
  }, [
    setValue,
    task.taskDescription,
    task.taskMaturity,
    task.taskPriority,
    task.taskTitle,
  ])

  const onSubmit = useCallback(
    async (data: typeFieldsSchema) => {
      try {
        createNewTaks(data)
      } catch (err) {
        console.log(err)
      }
    },
    [createNewTaks],
  )

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <ModalHeader>
          <Dialog.Title>📝 • Editar task</Dialog.Title>
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
