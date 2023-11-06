import * as Dialog from '@radix-ui/react-dialog'
import {
  CancelButton,
  CreateTaskButton,
  DialogClose,
  DialogContent,
  DialogOverlay,
  MaturityPicker,
  ModalContent,
  ModalFooter,
  ModalHeader,
  TaskDescriptionInput,
  TaskIformations,
  TaskTitleInput,
} from './styles'
import { X } from '@phosphor-icons/react'
import { StatusPicker, StatusSchema } from '../StatusPicker'
import { PriorityPicker, PrioritySchema } from '../PriorityPicker'
import { ProjectPicker } from '../ProjectPicker'
import { useCallback, useContext, useEffect, useState } from 'react'
import { OpenedTask, Project, TasksContext } from '../../contexts/TaskContext'
import { useForm } from 'react-hook-form'
import { string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useUpdateOpenedTask } from '../../hooks/tasks/useUpdateOpenedTask'
import { useNotify } from '../../hooks/useNotify'

interface NewTaskModalProps {
  handleCloseModal: () => void
  task: OpenedTask
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
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<EditFormSchema>({
    resolver: zodResolver(editFormSchema),
  })
  const { allProjects, handleUpdateOpenedTasks } = useContext(TasksContext)
  const { updateOpenedTask } = useUpdateOpenedTask()
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
        handleCloseModal()
        reset()
        notify({ type: 'sucess', message: 'Tarefa atualizada com sucesso.' })
      }
    },
    [
      handleCloseModal,
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
            <DialogClose>
              <X size={20} />
            </DialogClose>
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
            <CreateTaskButton disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </CreateTaskButton>
          </ModalFooter>
        </DialogContent>
      </form>
    </Dialog.Portal>
  )
}
