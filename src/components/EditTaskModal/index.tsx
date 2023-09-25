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
  InputStatus,
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
import { useDeleteTask } from '../../hooks/useDeleteTask'
import { format } from 'date-fns'

const tasksFieldsSchema = z.object({
  taskTitle: z.string(),
  taskStatus: z.string(),
  taskPriority: z.string(),
  taskMaturity: z.string(),
  taskDescription: z.string(),
})

type typeFieldsSchema = z.infer<typeof tasksFieldsSchema>

interface TaskFieldsReceived {
  taskId: string
  taskTitle: string
  taskStatus: 'opened' | 'in_progress' | 'approval' | 'concluded'
  taskPriority: string
  taskMaturity: string
  taskDescription: string
}

interface EditTaskModalProps {
  task: TaskFieldsReceived
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

  const { deleteTaskById } = useDeleteTask()

  const formattedMaturity = format(new Date(task.taskMaturity), 'yyyy-MM-dd')

  useEffect(() => {
    setValue('taskTitle', task.taskTitle)
    setValue('taskStatus', task.taskStatus)
    setValue('taskPriority', task.taskPriority)
    setValue('taskMaturity', formattedMaturity)
    setValue('taskDescription', task.taskDescription)
  }, [
    formattedMaturity,
    setValue,
    task.taskDescription,
    task.taskPriority,
    task.taskTitle,
    task.taskStatus,
  ])

  const onSubmit = useCallback(async (data: typeFieldsSchema) => {
    console.log(data)
  }, [])

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
          <InputStatus>
            Status:
            <select {...register('taskStatus')}>
              <option value="opened">Em Aberto</option>
              <option value="in_progress">Em Desenvolvimento</option>
              <option value="approval">Aprovação</option>
              <option value="concluded">Concluído</option>
            </select>
          </InputStatus>
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
              Excluir Task
              <Trash />
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
