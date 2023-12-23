import * as Dialog from '@radix-ui/react-dialog'
import {
  CancelButton,
  ConcludeOption,
  CreateTaskButton,
  DeleteOption,
  DialogClose,
  DialogConfirmDeleteContent,
  DialogContent,
  DialogOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  TaskControllers,
  TaskDescriptionInput,
  TaskIformations,
  TaskOptions,
  TaskTitleInput,
  UndoComletedTaskOption,
} from './styles'
import {
  ArrowCounterClockwise,
  CheckCircle,
  TrashSimple,
  X,
} from '@phosphor-icons/react'
import { useContext, useMemo, useState } from 'react'
import { TasksContext } from '../../contexts/TaskContext'
import { string, z } from 'zod'
import { Select } from '../Inputs/Select'
import { DatePicker } from '../Inputs/DatePicker'
import { FormProvider, useForm } from 'react-hook-form'
import { format, formatISO, parseISO } from 'date-fns'
import { useNotify } from '../../hooks/useNotify'
import { api } from '../../lib/axios'

interface Task {
  id: string
  title: string
  description: string
  priority: string
  status: string
  maturity: string
  createdAt: string
  completedAt?: string
  projectId: string
  userId: string
}

interface NewTaskModalProps {
  handleCloseModal: () => void
  task: Task
  isTaskConcluded: boolean
}

const editFormSchema = z.object({
  projectId: z.string(),
  title: z.string().min(4).nonempty({ message: 'O título é obrigatório' }),
  description: z.string(),
  maturity: string().min(4).nonempty({ message: 'Campo obrigatório' }),
  priority: string(),
  status: string(),
})

type EditFormSchema = z.infer<typeof editFormSchema>

export function EditTaskModal({ handleCloseModal, task }: NewTaskModalProps) {
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] =
    useState(false)
  const thisTaskIsConcluded = task.status === 'concluded'

  const defaultValues = {
    title: task.title,
    projectId: task.projectId,
    description: task.description,
    maturity: format(parseISO(task.maturity), 'yyyy-MM-dd'),
    priority: task.priority,
    status: task.status,
  }

  const methods = useForm<EditFormSchema>({
    values: defaultValues,
  })
  const { allProjects, handleUpdateOpenedTasks, handleUpdateCompletedTasks } =
    useContext(TasksContext)
  const { notify } = useNotify()

  const projectOptios = allProjects.map((project) => {
    return {
      label: project.title,
      value: project.id,
    }
  })

  const statusOptions = useMemo(() => {
    if (thisTaskIsConcluded) {
      return [{ label: 'Concluída', value: 'concluded' }]
    }

    return [
      { label: 'Em Aberto', value: 'toDo' },
      { label: 'StandBy', value: 'standby' },
      { label: 'Em Andamento', value: 'inProgress' },
      { label: 'Aprovação', value: 'approval' },
      { label: 'Pagamento', value: 'payment' },
    ]
  }, [thisTaskIsConcluded])

  const priorityOptions = [
    { label: 'Baixa', value: 'low' },
    { label: 'Normal', value: 'normal' },
    { label: 'Alta', value: 'high' },
    { label: 'Urgente', value: 'urgent' },
  ]

  const handleUpdateTask = methods.handleSubmit(
    async (data: EditFormSchema) => {
      try {
        const body = {
          description: data.description,
          id: task.id,
          maturity: formatISO(parseISO(data.maturity)),
          priority: data.priority,
          projectId: data.projectId,
          status: data.status,
          title: data.title,
        }

        await api.put('/tasks/edit-task-by-id', body)

        handleCloseModal()
        handleUpdateOpenedTasks()
        handleUpdateCompletedTasks()
        notify({ type: 'sucess', message: 'Tarefa atualizada com sucesso!' })
      } catch (err) {
        notify({ type: 'error', message: err as string })
      }
    },
  )

  const handleConcludeTask = methods.handleSubmit(
    async (data: EditFormSchema) => {
      try {
        const body = {
          createdAt: task.createdAt,
          description: data.description,
          maturity: formatISO(parseISO(data.maturity)),
          priority: data.priority,
          projectId: data.projectId,
          status: 'concluded',
          taskId: task.id,
          title: data.title,
        }

        await api.post('/tasks/conclude-task-by-id', body)

        handleCloseModal()
        handleUpdateOpenedTasks()
        handleUpdateCompletedTasks()
        notify({ type: 'sucess', message: 'Tarefa concluída com sucesso!' })
      } catch (err) {
        notify({ type: 'error', message: err as string })
      }
    },
  )

  const handleUndoCompletedTask = methods.handleSubmit(async () => {
    try {
      await api.post('/tasks/undo-concluded-task-by-id', {
        completedTaskId: task.id,
      })

      handleCloseModal()
      handleUpdateOpenedTasks()
      handleUpdateCompletedTasks()
      notify({ type: 'sucess', message: 'Conclusão desfeita com sucesso!' })
    } catch (err) {
      notify({ type: 'error', message: err as string })
    }
  })

  const handleDeleteTask = methods.handleSubmit(async () => {
    try {
      if (thisTaskIsConcluded) {
        await api.delete(`/tasks/delete-concluded-task-by-id/${task.id}`)

        handleCloseModal()
        handleUpdateOpenedTasks()
        handleUpdateCompletedTasks()
        notify({ type: 'sucess', message: 'Tarefa excluída com sucesso!' })

        return
      }
      await api.delete(`/tasks/delete-opened-task-by-id/${task.id}`)

      handleCloseModal()
      handleUpdateOpenedTasks()
      handleUpdateCompletedTasks()
      notify({ type: 'sucess', message: 'Tarefa excluída com sucesso!' })
    } catch (err) {
      notify({ type: 'error', message: err as string })
    }
  })

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <FormProvider {...methods}>
        <form onSubmit={handleUpdateTask}>
          <DialogContent>
            <ModalHeader>
              <TaskIformations>
                <Select
                  label="Projeto:"
                  options={projectOptios}
                  name="projectId"
                  required={true}
                  disabled={thisTaskIsConcluded}
                />
                <Select
                  label="Status:"
                  options={statusOptions}
                  name="status"
                  disabled={thisTaskIsConcluded}
                />
                <Select
                  label="Prioridade:"
                  options={priorityOptions}
                  name="priority"
                  required={true}
                  disabled={thisTaskIsConcluded}
                />
                <DatePicker
                  label="Vencimento:"
                  name="maturity"
                  disabled={thisTaskIsConcluded}
                  required={true}
                />
              </TaskIformations>
              <TaskOptions>
                <TaskControllers>
                  {!thisTaskIsConcluded ? (
                    <ConcludeOption onClick={handleConcludeTask}>
                      <span>Concluir Tarefa</span>
                      <CheckCircle size={24} />
                    </ConcludeOption>
                  ) : (
                    <UndoComletedTaskOption onClick={handleUndoCompletedTask}>
                      <span>Desfazer Conclusão</span>
                      <ArrowCounterClockwise size={24} />
                    </UndoComletedTaskOption>
                  )}
                  <Dialog.Root
                    open={confirmDeleteModalIsOpen}
                    onOpenChange={setConfirmDeleteModalIsOpen}
                  >
                    <Dialog.Trigger asChild>
                      <DeleteOption>
                        <span>Excluir Tarefa</span>
                        <TrashSimple size={24} />
                      </DeleteOption>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <DialogOverlay />
                      <DialogConfirmDeleteContent>
                        <Dialog.Title>⚠️ - Atenção</Dialog.Title>
                        <span>
                          Você está prestes a excluir uma tarefa, confirma esta
                          ação?
                        </span>
                        <ModalFooter>
                          <CancelButton
                            onClick={() => {
                              setConfirmDeleteModalIsOpen(false)
                            }}
                          >
                            Cancelar
                          </CancelButton>
                          <CreateTaskButton onClick={handleDeleteTask}>
                            Excluir
                          </CreateTaskButton>
                        </ModalFooter>
                      </DialogConfirmDeleteContent>
                    </Dialog.Portal>
                  </Dialog.Root>
                </TaskControllers>
                <DialogClose>
                  <X size={20} />
                </DialogClose>
              </TaskOptions>
            </ModalHeader>
            <ModalContent>
              <TaskTitleInput
                type="text"
                placeholder="Adicione um título"
                {...methods.register('title')}
                disabled={thisTaskIsConcluded}
              />
              <TaskDescriptionInput
                rows={15}
                placeholder={
                  thisTaskIsConcluded
                    ? 'Este projeto não teve uma descrição'
                    : 'Adicione uma descrição'
                }
                {...methods.register('description')}
                disabled={thisTaskIsConcluded}
              />
            </ModalContent>
            <ModalFooter>
              <CancelButton
                type="button"
                onClick={() => {
                  handleCloseModal()
                }}
              >
                Fechar
              </CancelButton>
              <CreateTaskButton type="submit" disabled={thisTaskIsConcluded}>
                Salvar
              </CreateTaskButton>
            </ModalFooter>
          </DialogContent>
        </form>
      </FormProvider>
    </Dialog.Portal>
  )
}
