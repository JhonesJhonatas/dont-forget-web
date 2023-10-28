import * as Dialog from '@radix-ui/react-dialog'
import {
  CancelButton,
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
import { X } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useCreateTask } from '../../hooks/tasks/useCreateTask'
import { useNavigate } from 'react-router-dom'
import { useGetProjects } from '../../hooks/projects/useGetProjects'
import { useNotify } from '../../hooks/useNotify'

const newTaskFormSchema = z.object({
  projectId: z.string(),
  title: z.string(),
  description: z.string(),
  maturity: z.string(),
  priority: z.string(),
})

type NewTaskFormSchema = z.infer<typeof newTaskFormSchema>

interface NewTaskModalProps {
  handleCloseModal: () => void
}

export function NewTaskModal({ handleCloseModal }: NewTaskModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTaskFormSchema>({
    resolver: zodResolver(newTaskFormSchema),
  })

  const { createTask } = useCreateTask()
  const navigate = useNavigate()
  const { allProjects } = useGetProjects()
  const { notify } = useNotify()

  const onSubmit = useCallback(
    async ({
      description,
      maturity,
      priority,
      projectId,
      title,
    }: NewTaskFormSchema) => {
      const isTaskCreated = await createTask({
        description,
        maturity,
        priority,
        projectId,
        title,
      })

      if (isTaskCreated) {
        reset()
        handleCloseModal()
        notify({ type: 'sucess', message: 'Tarefa criada com sucesso' })
        navigate('/tasks/all')
      }
    },
    [createTask, handleCloseModal, navigate, notify, reset],
  )

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <ModalHeader>
          <Dialog.Title>📝 • Criar nova task</Dialog.Title>
          <DialogCloese>
            <X />
          </DialogCloese>
        </ModalHeader>
        <NewTaskForm onSubmit={handleSubmit(onSubmit)}>
          <InputTitle>
            Título:
            <input type="text" placeholder="Título" {...register('title')} />
          </InputTitle>
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
          <InputPriority>
            Projeto:
            <select {...register('projectId')}>
              {allProjects.map((project) => {
                return (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                )
              })}
            </select>
          </InputPriority>
          <InputTextArea>
            Descrição:
            <textarea {...register('description')} />
          </InputTextArea>
          <FormFooter>
            <Dialog.Close asChild>
              <CancelButton>Cancelar</CancelButton>
            </Dialog.Close>
            <SaveButton disabled={isSubmitting}>Criar</SaveButton>
          </FormFooter>
        </NewTaskForm>
      </DialogContent>
    </Dialog.Portal>
  )
}
