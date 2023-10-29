import * as Dialog from '@radix-ui/react-dialog'
import {
  InputColor,
  DialogCloese,
  DialogContent,
  DialogOverlay,
  FlexArea,
  InputTitle,
  ModalContent,
  ModalHeader,
  ColorDemonstration,
  InputTextArea,
  FormFooter,
  CancelButton,
  SaveButton,
} from './styles'
import { Circle, X } from '@phosphor-icons/react'

export function NewProjectModal() {
  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <ModalHeader>
          <Dialog.Title>Novo Projeto</Dialog.Title>
          <DialogCloese>
            <X />
          </DialogCloese>
        </ModalHeader>
        <ModalContent>
          <form action="">
            <FlexArea>
              <InputTitle>
                Título:
                <input type="text" placeholder="Título" />
              </InputTitle>
              <InputColor>
                Cor:
                <ColorDemonstration>
                  <Circle size={24} weight="fill" />
                </ColorDemonstration>
              </InputColor>
            </FlexArea>
            <InputTextArea>
              Descrição:
              <textarea />
            </InputTextArea>
          </form>
          <FormFooter>
            <Dialog.Close asChild>
              <CancelButton>Cancelar</CancelButton>
            </Dialog.Close>
            <SaveButton>Salvar</SaveButton>
          </FormFooter>
        </ModalContent>
      </DialogContent>
    </Dialog.Portal>
  )
}
