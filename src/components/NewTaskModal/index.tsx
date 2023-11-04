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
import { StatusPicker } from '../StatusPicker'
import { PriorityPicker } from '../PriorityPicker'
import { MaturityPicker } from '../MaturityPicker'
import { ProjectPicker } from '../ProjectPicker'

interface NewTaskModalProps {
  handleCloseModal: () => void
}

export function NewTaskModal({ handleCloseModal }: NewTaskModalProps) {
  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <ModalHeader>
          <TaskIformations>
            <ProjectPicker />
            <StatusPicker />
            <PriorityPicker />
            <MaturityPicker />
          </TaskIformations>
          <DialogClose>
            <X size={20} />
          </DialogClose>
        </ModalHeader>
        <ModalContent>
          <TaskTitleInput type="text" placeholder="Adicione um título" />
          <TaskDescriptionInput
            rows={15}
            placeholder="Adicione uma descrição"
          />
        </ModalContent>
        <ModalFooter>
          <CancelButton>Cancelar</CancelButton>
          <CreateTaskButton>Criar Tarefa</CreateTaskButton>
        </ModalFooter>
      </DialogContent>
    </Dialog.Portal>
  )
}
