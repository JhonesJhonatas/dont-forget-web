import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'

interface ConcludeOptionProps {
  isComplete?: boolean
}

interface CreateTaskButtonPops {
  disabled?: boolean
}

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0 0 0 / 0.75);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

export const DialogContent = styled(Dialog.Content)`
  width: 60vw;
  min-height: 70vh;
  padding: 2rem;
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
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const DialogConfirmDeleteContent = styled(Dialog.Content)`
  width: 30vw;
  height: fit-content;
  padding: 2rem;
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
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  span {
    background-color: ${(props) => props.theme.error};
    color: ${(props) => props.theme.textPrimary};
    padding: 0.5rem;
    border-radius: 6px;
  }
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TaskIformations = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const TaskOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

export const TaskControllers = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const ConcludeOption = styled.div<ConcludeOptionProps>`
  border: 1.5px solid ${(props) => props.theme.sucess};
  padding: 0.25rem;
  border-radius: 60px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;
  transition: all 0.4s ease-in-out;

  span {
    display: none;
    margin-left: 0.5rem;
  }

  svg {
    color: ${(props) => props.theme.sucess};
  }

  &:hover {
    background-color: ${(props) => props.theme.sucess};
    span {
      display: flex;
    }
    svg {
      color: ${(props) => props.theme.textPrimary};
    }
  }
`

export const UndoComletedTaskOption = styled.div`
  border: 1.5px solid ${(props) => props.theme.enphasis};
  padding: 0.25rem;
  border-radius: 60px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;
  transition: all 0.4s ease-in-out;

  span {
    display: none;
    margin-left: 0.5rem;
  }

  svg {
    color: ${(props) => props.theme.enphasis};
  }

  &:hover {
    background-color: ${(props) => props.theme.enphasis};
    span {
      display: flex;
    }
    svg {
      color: ${(props) => props.theme.textPrimary};
    }
  }
`

export const DeleteOption = styled.div`
  border: 1.5px solid ${(props) => props.theme.error};
  padding: 0.25rem;
  border-radius: 60px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;
  transition: all 0.4s ease-in-out;

  span {
    display: none;
    margin-left: 0.5rem;
  }

  svg {
    color: ${(props) => props.theme.error};
  }

  &:hover {
    background-color: ${(props) => props.theme.error};
    span {
      display: flex;
    }
    svg {
      color: ${(props) => props.theme.textPrimary};
    }
  }
`

export const MaturityPicker = styled.input`
  background-color: ${(props) => props.theme.cardBgPrimary};
  border: 1px solid ${(props) => props.theme.borderCard};
  color: ${(props) => props.theme.textPrimary};
  padding: 0.35rem;
  border-radius: 6px;

  cursor: pointer;

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.enphasis};
  }
`

export const DialogClose = styled.div`
  border: none;
  outline: none;
  background-color: transparent;
  color: ${(props) => props.theme.textPrimary};
  cursor: pointer;
`

export const ModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

export const CreateTaskButton = styled.button<CreateTaskButtonPops>`
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

  &:disabled {
    background-color: ${(props) => props.theme.cardBgPrimary};
    color: ${(props) => props.theme.background};
    cursor: not-allowed;
  }
`
