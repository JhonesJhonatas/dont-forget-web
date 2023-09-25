import { Trash, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import {
  CancelButton,
  DeleteButton,
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
import { useDeleteTask } from '../../hooks/useDeleteTask'

const tasksFieldsSchema = z.object({
  taskId: z.string(),
  taskTitle: z.string(),
  taskPriority: z.string(),
  taskMaturity: z.string(),
  taskDescription: z.string(),
})

type typeFieldsSchema = z.infer<typeof tasksFieldsSchema>

interface EditTaskModalProps {
  task: typeFieldsSchema
  handleTogleModal: () => void
}

export function EditTaskModal({ task, handleTogleModal }: EditTaskModalProps) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<typeFieldsSchema>({
    resolver: zodResolver(tasksFieldsSchema),
  })

  const { createNewTaks } = useCreateTask()
  const { deleteTaskById } = useDeleteTask()

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

  const handleDeleteTask = useCallback(
    async (taskId: string) => {
      await deleteTaskById(taskId)
      handleTogleModal()
    },
    [deleteTaskById, handleTogleModal],
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
            <DeleteButton
              onClick={() => {
                handleDeleteTask(task.taskId)
              }}
            >
              <Trash />
              Excluir Task
            </DeleteButton>
            <div>
              <Dialog.Close asChild>
                <CancelButton>Cancelar</CancelButton>
              </Dialog.Close>
              <SaveButton disabled={isSubmitting}>Salvar</SaveButton>
            </div>
          </FormFooter>
        </NewTaskForm>
      </DialogContent>
    </Dialog.Portal>
  )
}
