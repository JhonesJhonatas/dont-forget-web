import * as Dialog from '@radix-ui/react-dialog'
import {
  CancelButton,
  CreateTaskButton,
  DialogClose,
  DialogContent,
  DialogOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  TaskDescriptionInput,
  TaskIformations,
  TaskTitleInput,
} from './styles'
import { X } from '@phosphor-icons/react'
import { useCallback, useContext, useEffect } from 'react'
import { TasksContext } from '../../contexts/TaskContext'
import { FormProvider, useForm } from 'react-hook-form'
import { string, z } from 'zod'
import { useNotify } from '../../hooks/useNotify'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select } from '../Inputs/Select'
import { DatePicker } from '../Inputs/DatePicker'
import { formatISO, parseISO } from 'date-fns'
import { api } from '../../lib/axios'
interface NewTaskModalProps {
  handleCloseModal: () => void
}

const createTaskFormSchema = z.object({
  projectId: z.string(),
  title: z.string().nonempty({ message: 'O título é obrigatório' }),
  description: z.string(),
  maturity: string(),
  priority: string(),
  status: string(),
})

type CreateTaskFormSchema = z.infer<typeof createTaskFormSchema>

export function NewTaskModal({ handleCloseModal }: NewTaskModalProps) {
  const methods = useForm<CreateTaskFormSchema>({
    resolver: zodResolver(createTaskFormSchema),
  })

  const {
    allProjects,
    handleUpdateOpenedTasks,
    handleUpdateCompletedTasks,
    handleUpdateTasksOfWeek,
  } = useContext(TasksContext)
  const { notify } = useNotify()

  const projectOptios = allProjects.map((project) => {
    return {
      label: project.title,
      value: project.id,
    }
  })

  const statusOptions = [
    { label: 'Em Aberto', value: 'toDo' },
    { label: 'StandBy', value: 'standby' },
    { label: 'Em Andamento', value: 'inProgress' },
    { label: 'Aprovação', value: 'approval' },
    { label: 'Pagamento', value: 'payment' },
  ]

  const priorityOptions = [
    { label: 'Baixa', value: 'low' },
    { label: 'Normal', value: 'normal' },
    { label: 'Alta', value: 'high' },
    { label: 'Urgente', value: 'urgent' },
  ]

  useEffect(() => {
    if (methods.formState.errors.title) {
      notify({
        type: 'error',
        message: 'O Título é obrigatório para a criação da tarefa!',
      })
    }
    if (methods.formState.errors.maturity) {
      notify({
        type: 'error',
        message: 'O Vencimento é obrigatório para a criação da tarefa!',
      })
    }
  }, [
    methods.formState.errors.maturity,
    methods.formState.errors.title,
    notify,
  ])

  const handleCloseThisModal = useCallback(() => {
    methods.reset()
    handleCloseModal()
  }, [handleCloseModal, methods])

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const body = {
        description: data.description,
        maturity: data.maturity ? formatISO(parseISO(data.maturity)) : null,
        priority: data.priority,
        projectId: data.projectId,
        status: data.status,
        title: data.title,
      }

      await api.post('/tasks/create-task', body)

      handleCloseThisModal()
      handleUpdateOpenedTasks()
      handleUpdateCompletedTasks()
      handleUpdateTasksOfWeek()
      notify({ type: 'sucess', message: 'Tarefa excluída com sucesso!' })
    } catch (err) {
      notify({ type: 'error', message: err as string })
    }
  })

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <ModalHeader>
              <TaskIformations>
                <Select
                  label="Projeto:"
                  options={projectOptios}
                  name="projectId"
                  required={true}
                />
                <Select label="Status:" options={statusOptions} name="status" />
                <Select
                  label="Prioridade:"
                  options={priorityOptions}
                  name="priority"
                  required={true}
                />
                <DatePicker label="Vencimento:" name="maturity" />
              </TaskIformations>
              <DialogClose onClick={handleCloseThisModal}>
                <X size={20} />
              </DialogClose>
            </ModalHeader>
            <ModalContent>
              <TaskTitleInput
                type="text"
                placeholder="Adicione um título"
                {...methods.register('title')}
              />
              <TaskDescriptionInput
                rows={15}
                placeholder="Adicione uma descrição"
                {...methods.register('description')}
              />
            </ModalContent>
            <ModalFooter>
              <CancelButton type="button" onClick={handleCloseThisModal}>
                Cancelar
              </CancelButton>
              <CreateTaskButton type="submit">
                {methods.formState.isSubmitting
                  ? 'Criando Tarefa...'
                  : 'Criar Tarefa'}
              </CreateTaskButton>
            </ModalFooter>
          </DialogContent>
        </form>
      </FormProvider>
    </Dialog.Portal>
  )
}
