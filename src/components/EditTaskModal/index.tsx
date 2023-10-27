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
import { useUpdateTask } from '../../hooks/useUpdateTask'
import { OpenedTask } from '../../hooks/tasks/useGetAllOpenedTasks'

const tasksFieldsSchema = z.object({
  taskTitle: z.string(),
  taskStatus: z.string(),
  taskPriority: z.string(),
  taskMaturity: z.string(),
  taskDescription: z.string(),
})

type typeFieldsSchema = z.infer<typeof tasksFieldsSchema>

interface EditTaskModalProps {
  task: OpenedTask
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
  const { updateTask } = useUpdateTask()

  const formattedMaturity = format(new Date(task.maturity), 'yyyy-MM-dd')

  useEffect(() => {
    setValue('taskTitle', task.title)
    setValue('taskStatus', task.status)
    setValue('taskPriority', task.priority)
    setValue('taskMaturity', formattedMaturity)
    setValue('taskDescription', task.description)
  }, [
    formattedMaturity,
    setValue,
    task.description,
    task.priority,
    task.status,
    task.title,
  ])

  const onSubmit = useCallback(
    async (data: typeFieldsSchema) => {
      const formattedData = {
        id: task.id,
        description: data.taskDescription,
        maturity: data.taskMaturity,
        priority: data.taskPriority,
        status: data.taskStatus,
        title: data.taskTitle,
      }

      await updateTask(formattedData)
      handleTogleModal()
    },
    [handleTogleModal, task.id, updateTask],
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
          <InputStatus>
            Status:
            <select {...register('taskStatus')}>
              <option value="toDo">Em Aberto</option>
              <option value="standby">StandBy</option>
              <option value="inProgress">Em Andamento</option>
              <option value="approval">Aprovação</option>
              <option value="payment">Aguardando Pagamento</option>
              <option value="concluded">Concluído</option>
            </select>
          </InputStatus>
          <FlexArea>
            <InputPriority>
              Prioridade:
              <select {...register('taskPriority')}>
                <option value="low">Baixa</option>
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
                handleDeleteTask(task.id)
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
