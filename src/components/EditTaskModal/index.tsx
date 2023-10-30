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
import { useCallback, useContext, useEffect } from 'react'
import { format } from 'date-fns'
import { useDeleteOpenedTask } from '../../hooks/tasks/useDeleteOpenedTask'
import { useNotify } from '../../hooks/useNotify'
import { OpenedTask, TasksContext } from '../../contexts/TaskContext'
import { useUpdateOpenedTask } from '../../hooks/tasks/useUpdateOpenedTask'
import { useNavigate } from 'react-router-dom'

const editTaskFormSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  title: z.string(),
  status: z.string(),
  priority: z.string(),
  maturity: z.string(),
  description: z.string(),
})

type EditTaskFormSchema = z.infer<typeof editTaskFormSchema>

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
  } = useForm<EditTaskFormSchema>({
    resolver: zodResolver(editTaskFormSchema),
  })
  const { deleteOpenedTask } = useDeleteOpenedTask()
  const { notify } = useNotify()
  const { handleUpdateOpenedTasks } = useContext(TasksContext)
  const { updateOpenedTask } = useUpdateOpenedTask()
  const navigate = useNavigate()

  const formattedMaturity = format(new Date(task.maturity), 'yyyy-MM-dd')

  useEffect(() => {
    setValue('id', task.id)
    setValue('projectId', task.projectId)
    setValue('title', task.title)
    setValue('status', task.status)
    setValue('priority', task.priority)
    setValue('maturity', formattedMaturity)
    setValue('description', task.description)
  }, [
    setValue,
    task.description,
    task.id,
    formattedMaturity,
    task.priority,
    task.projectId,
    task.status,
    task.title,
  ])

  const onSubmit = useCallback(
    async ({
      description,
      id,
      maturity,
      priority,
      projectId,
      status,
      title,
    }: EditTaskFormSchema) => {
      const updatedTask = await updateOpenedTask({
        description,
        id,
        maturity,
        priority,
        projectId,
        status,
        title,
      })

      if (updatedTask) {
        handleTogleModal()
        handleUpdateOpenedTasks()
        navigate('/tasks/all')
      }
    },
    [handleTogleModal, handleUpdateOpenedTasks, navigate, updateOpenedTask],
  )

  const handleDeleteTask = useCallback(
    async (id: string) => {
      deleteOpenedTask({ id, handleUpdateOpenedTasks })
      handleTogleModal()
      notify({ type: 'sucess', message: 'Tarefa excluída' })
      navigate('/tasks/all')
    },
    [
      deleteOpenedTask,
      handleTogleModal,
      handleUpdateOpenedTasks,
      navigate,
      notify,
    ],
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
            <input type="text" placeholder="Título" {...register('title')} />
          </InputTitle>
          <InputStatus>
            Status:
            <select {...register('status')}>
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
              <select {...register('priority')}>
                <option value="low">Baixa</option>
                <option value="normal">Normal</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </InputPriority>
            <InputDate>
              DeadLine:
              <input type="date" {...register('maturity')} />
            </InputDate>
          </FlexArea>
          <InputTextArea>
            Descrição:
            <textarea {...register('description')} />
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
