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
import { Project, TasksContext } from '../../contexts/TaskContext'
import { useForm } from 'react-hook-form'
import { useCreateTask } from '../../hooks/tasks/useCreateTask'
import { string, z } from 'zod'
import { useNotify } from '../../hooks/useNotify'
import { zodResolver } from '@hookform/resolvers/zod'

interface NewTaskModalProps {
  handleCloseModal: () => void
}

const createTaskFormSchema = z.object({
  projectId: z.string(),
  title: z.string().nonempty({ message: 'O título é obrigatório' }),
  description: z.string(),
  maturity: string().nonempty({ message: 'Campo obrigatório' }),
  priority: string(),
  status: string(),
})

type CreateTaskFormSchema = z.infer<typeof createTaskFormSchema>

export function NewTaskModal({ handleCloseModal }: NewTaskModalProps) {
  const [selectedProject, setSelecetdProject] = useState({} as Project)
  const [selectedStatus, setSelectedStatus] = useState({} as StatusSchema)
  const [selectedPriority, setSelectedPriority] = useState({} as PrioritySchema)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<CreateTaskFormSchema>({
    resolver: zodResolver(createTaskFormSchema),
  })
  const { createTask } = useCreateTask()
  const { handleUpdateOpenedTasks, handleUpdateCompletedTasks } =
    useContext(TasksContext)
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

  useEffect(() => {
    setValue('projectId', selectedProject.id)
    setValue('status', selectedStatus.value)
    setValue('priority', selectedPriority.value)
  }, [
    selectedPriority.value,
    selectedProject.id,
    selectedStatus.value,
    setValue,
  ])

  const onSubmit = useCallback(
    async ({ description, maturity, title }: CreateTaskFormSchema) => {
      const projectId = getValues('projectId')
      const status = getValues('status')
      const priority = getValues('priority')

      const isTaskCreated = await createTask({
        description,
        maturity,
        priority,
        projectId,
        title,
        status,
      })

      if (isTaskCreated) {
        handleCloseModal()
        handleUpdateOpenedTasks()
        handleUpdateCompletedTasks()
        notify({ type: 'sucess', message: 'Tarefa criada com sucesso' })
        setValue('title', '')
        setValue('description', '')
        setValue('maturity', '')
      }
    },
    [
      createTask,
      getValues,
      handleCloseModal,
      handleUpdateCompletedTasks,
      handleUpdateOpenedTasks,
      notify,
      setValue,
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
              <ProjectPicker handleSelectProject={handleSelectProject} />
              <StatusPicker handleSelectStatus={handleSelectStatus} />
              <PriorityPicker handleSelectPriority={handleSelectPriority} />
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
              }}
            >
              Cancelar
            </CancelButton>
            <CreateTaskButton>
              {isSubmitting ? 'Criando Tarefa...' : 'Criar Tarefa'}
            </CreateTaskButton>
          </ModalFooter>
        </DialogContent>
      </form>
    </Dialog.Portal>
  )
}
