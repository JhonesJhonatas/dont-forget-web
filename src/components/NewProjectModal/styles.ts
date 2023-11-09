import styled, { css } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

interface BoxColorProps {
  $isOpen: boolean
}

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0 0 0 / 0.75);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

export const DialogContent = styled(Dialog.Content)`
  background-color: ${(props) => props.theme.cardBgSecondary};
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  padding: 2rem;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const ModalContent = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;
`

export const FormContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ColorPicker = styled.div`
  svg {
    background-color: ${(props) => props.theme.cardBgPrimary};
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 60px;
    padding: 0.5rem;

    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.borderCard};
    }
  }
`

export const BoxColors = styled.div<BoxColorProps>`
  ${(props) =>
    props.$isOpen
      ? css`
          display: grid;
        `
      : css`
          display: none;
        `}
  margin-top: 1rem;
  position: absolute;
  background-color: ${(props) => props.theme.cardBgPrimary};
  padding: 0.5rem;
  border-radius: 6px;

  grid-template-columns: 1fr 1fr;
`

export const TaskTitleInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.theme.textPrimary};
  font-size: 2rem;
  font-weight: bold;
  border-radius: 6px;
`

export const TaskDescriptionInput = styled.textarea`
  height: 100%;
  width: 100%;
  resize: none;
  background-color: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.theme.textPrimary};
  font-size: 1rem;
  font-weight: regular;
`

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: end;
`

export const CancelButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.textPrimary};

  cursor: pointer;
`

export const CreateTaskButton = styled.button`
  border: 0;
  background-color: ${(props) => props.theme.enphasis};
  color: ${(props) => props.theme.textPrimary};
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    height: 1rem;
    width: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.enphasisHover};
  }
`
