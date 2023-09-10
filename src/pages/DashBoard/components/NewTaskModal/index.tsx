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

export function NewTaskModal() {
  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <ModalHeader>
          <Dialog.Title>📝 • Criar novo lembrete</Dialog.Title>
          <DialogCloese>
            <X />
          </DialogCloese>
        </ModalHeader>
        <NewTaskForm>
          <InputTitle>
            Título:
            <input type="text" placeholder="Título" />
          </InputTitle>
          <FlexArea>
            <InputPriority>
              Prioridade:
              <select>
                <option value="">Normal</option>
                <option value="">Alta</option>
                <option value="">Urgente</option>
              </select>
            </InputPriority>
            <InputDate>
              DeadLine:
              <input type="date" />
            </InputDate>
          </FlexArea>
          <InputTextArea>
            Descrição:
            <textarea />
          </InputTextArea>
          <FormFooter>
            <Dialog.Close asChild>
              <CancelButton>Cancelar</CancelButton>
            </Dialog.Close>
            <SaveButton>Salvar</SaveButton>
          </FormFooter>
        </NewTaskForm>
      </DialogContent>
    </Dialog.Portal>
  )
}
