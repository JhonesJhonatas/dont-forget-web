import * as Dialog from '@radix-ui/react-dialog'
import {
  CancelButton,
  ConcludeOption,
  CreateTaskButton,
  DeleteOption,
  DialogClose,
  DialogContent,
  DialogOverlay,
  MaturityPicker,
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
import { StatusPicker, StatusSchema } from '../StatusPicker'
import { PriorityPicker, PrioritySchema } from '../PriorityPicker'
import { ProjectPicker } from '../ProjectPicker'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Project, TasksContext } from '../../contexts/TaskContext'
import { useForm } from 'react-hook-form'
import { string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useNotify } from '../../hooks/useNotify'
import { useDeleteOpenedTask } from '../../hooks/tasks/useDeleteOpenedTask'
import { useConcludeTask } from '../../hooks/tasks/useConcludeTask'
import { useUpdateOpenedTask } from '../../hooks/tasks/useUpdateOpenedTask'

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
  const [selectedProject, setSelecetdProject] = useState({} as Project)
  const [selectedStatus, setSelectedStatus] = useState({} as StatusSchema)
  const [selectedPriority, setSelectedPriority] = useState({} as PrioritySchema)

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<EditFormSchema>({
    resolver: zodResolver(editFormSchema),
  })
  const { handleUpdateOpenedTasks, handleUpdateCompletedTasks, allProjects } =
    useContext(TasksContext)
  const { updateOpenedTask } = useUpdateOpenedTask()
  const { deleteOpenedTask } = useDeleteOpenedTask()
  const { concludeTask } = useConcludeTask()
  const { notify } = useNotify()

  const handleSelectProject = useCallback(
    ({ color, createdAt, description, id, title, userId }: Project) => {
      setSelecetdProject({ color, createdAt, description, id, title, userId })
    },
    [],
  )

  const handleSelectStatus = useCallback(
    ({ color, id, title, value }: StatusSchema) => {
      setSelectedStatus({ color, id, title, value })
    },
    [],
  )

  const handleSelectPriority = useCallback(
    ({ color, id, title, value }: StatusSchema) => {
      setSelectedPriority({ color, id, title, value })
    },
    [],
  )

  const initialProject = allProjects.find(
    (project) => project.id === task.projectId,
  )

  useEffect(() => {
    setValue('projectId', selectedProject.id)
    setValue('status', selectedStatus.value)
    setValue('priority', selectedPriority.value)
    setValue('title', task.title)
    setValue('description', task.description)
    setValue('maturity', format(new Date(task.maturity), 'yyyy-MM-dd'))
  }, [
    selectedPriority.value,
    selectedProject.id,
    selectedStatus.value,
    setValue,
    task.description,
    task.maturity,
    task.title,
  ])

  const onSubmit = useCallback(
    async ({
      description,
      maturity,
      priority,
      projectId,
      status,
      title,
    }: EditFormSchema) => {
      const taskUpdated = await updateOpenedTask({
        description,
        id: task.id,
        maturity,
        priority,
        projectId,
        status,
        title,
      })

      if (taskUpdated) {
        handleUpdateOpenedTasks()
        handleUpdateCompletedTasks()
        handleCloseModal()
        reset()
        notify({ type: 'sucess', message: 'Tarefa atualizada com sucesso.' })
      }
    },
    [
      handleCloseModal,
      handleUpdateCompletedTasks,
      handleUpdateOpenedTasks,
      notify,
      reset,
      task.id,
      updateOpenedTask,
    ],
  )

  useEffect(() => {
    if (errors.title?.message) {
      notify({ type: 'error', message: 'É necessário adicionar um título' })
    }

    if (errors.maturity?.message) {
      notify({
        type: 'error',
        message: 'É necessário adicionar uma data de vencimento',
      })
    }
  }, [errors.maturity?.message, errors.title?.message, notify])

  const handleDeleteTask = useCallback(() => {
    deleteOpenedTask({ id: task.id, handleUpdateOpenedTasks })
    handleCloseModal()
    handleUpdateOpenedTasks()
    handleUpdateCompletedTasks()
    notify({ type: 'sucess', message: 'Tarefa excluída' })
  }, [
    deleteOpenedTask,
    handleCloseModal,
    handleUpdateCompletedTasks,
    handleUpdateOpenedTasks,
    notify,
    task.id,
  ])

  const handleCompleteTask = useCallback(async () => {
    const concludedTask = await concludeTask({
      createdAt: task.createdAt,
      description: getValues('description'),
      maturity: getValues('maturity'),
      priority: getValues('priority'),
      projectId: getValues('projectId'),
      status: getValues('status'),
      taskId: task.id,
      title: getValues('title'),
    })

    if (concludedTask) {
      handleCloseModal()
      handleUpdateOpenedTasks()
      handleUpdateCompletedTasks()
      reset()
      notify({ type: 'sucess', message: 'Tarefa Concluída com sucesso' })
    }
  }, [
    concludeTask,
    getValues,
    handleCloseModal,
    handleUpdateCompletedTasks,
    handleUpdateOpenedTasks,
    notify,
    reset,
    task.createdAt,
    task.id,
  ])

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <ModalHeader>
            <TaskIformations>
              <ProjectPicker
                handleSelectProject={handleSelectProject}
                initialValue={initialProject}
              />
              <StatusPicker
                handleSelectStatus={handleSelectStatus}
                initialStatus={task.status}
              />
              <PriorityPicker
                handleSelectPriority={handleSelectPriority}
                initialPriority={task.priority}
              />
              <MaturityPicker type="date" {...register('maturity')} />
            </TaskIformations>
            <TaskOptions>
              <TaskControllers>
                <ConcludeOption onClick={() => handleCompleteTask()}>
                  <span>Concluir Task</span>
                  <CheckCircle size={24} />
                </ConcludeOption>
                <DeleteOption onClick={() => handleDeleteTask()}>
                  <span>Excluir Task</span>
                  <TrashSimple size={24} />
                </DeleteOption>
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
              {...register('title')}
            />
            <TaskDescriptionInput
              rows={15}
              placeholder="Adicione uma descrição"
              {...register('description')}
            />
          </ModalContent>
          <ModalFooter>
            <CancelButton
              onClick={() => {
                handleCloseModal()
                reset()
              }}
            >
              Cancelar
            </CancelButton>
            <CreateTaskButton>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </CreateTaskButton>
          </ModalFooter>
        </DialogContent>
      </form>
    </Dialog.Portal>
  )
}
