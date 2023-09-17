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

const newTaskFieldsSchema = z.object({
  taskTitle: z.string(),
  taskPriority: z.string(),
  taskMaturity: z.date(),
  taskDescription: z.string(),
})

type typeFieldsSchema = z.infer<typeof newTaskFieldsSchema>

export function NewTaskModal() {
  const { register } = useForm<typeFieldsSchema>({
    resolver: zodResolver(newTaskFieldsSchema),
  })

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
        <NewTaskForm>
          <InputTitle>
            Título:
            <input
              type="text"
              placeholder="Título"
              {...register('taskTitle')}
            />
          </InputTitle>
          <FlexArea>
            <InputPriority>
              Prioridade:
              <select {...register('taskPriority')}>
                <option value="">Normal</option>
                <option value="">Alta</option>
                <option value="">Urgente</option>
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
            <Dialog.Close asChild>
              <CancelButton>Cancelar</CancelButton>
            </Dialog.Close>
            <SaveButton>Criar</SaveButton>
          </FormFooter>
        </NewTaskForm>
      </DialogContent>
    </Dialog.Portal>
  )
}
