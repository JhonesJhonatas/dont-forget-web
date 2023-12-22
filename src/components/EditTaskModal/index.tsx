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
} from './styles'
import { CheckCircle, TrashSimple, X } from '@phosphor-icons/react'
import { useContext, useState } from 'react'
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
  const { allProjects, handleUpdateOpenedTasks } = useContext(TasksContext)
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
    { label: 'Concluída', value: 'concluded' },
  ]

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
        notify({ type: 'sucess', message: 'Tarefa concluída com sucesso!' })
      } catch (err) {
        notify({ type: 'error', message: err as string })
      }
    },
  )

  const handleDeleteTask = methods.handleSubmit(async () => {
    try {
      await api.delete(`/tasks/delete-opened-task-by-id/${task.id}`)

      handleCloseModal()
      handleUpdateOpenedTasks()
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
                />
                <Select label="Status:" options={statusOptions} name="status" />
                <Select
                  label="Prioridade:"
                  options={priorityOptions}
                  name="priority"
                  required={true}
                />
                <DatePicker
                  label="Vencimento:"
                  name="maturity"
                  required={true}
                />
              </TaskIformations>
              <TaskOptions>
                <TaskControllers>
                  <ConcludeOption onClick={handleConcludeTask}>
                    <span>Concluir Task</span>
                    <CheckCircle size={24} />
                  </ConcludeOption>
                  <Dialog.Root
                    open={confirmDeleteModalIsOpen}
                    onOpenChange={setConfirmDeleteModalIsOpen}
                  >
                    <Dialog.Trigger asChild>
                      <DeleteOption>
                        <span>Excluir Task</span>
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
              />
              <TaskDescriptionInput
                rows={15}
                placeholder="Adicione uma descrição"
                {...methods.register('description')}
              />
            </ModalContent>
            <ModalFooter>
              <CancelButton
                onClick={() => {
                  handleCloseModal()
                }}
              >
                Cancelar
              </CancelButton>
              <CreateTaskButton>Salvar</CreateTaskButton>
            </ModalFooter>
          </DialogContent>
        </form>
      </FormProvider>
    </Dialog.Portal>
  )
}
