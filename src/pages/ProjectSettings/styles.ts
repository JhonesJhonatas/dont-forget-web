import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const EditProjectArea = styled.div`
  background-color: ${(props) => props.theme.cardBgSecondary};
  padding: 1rem;
  border-radius: 6px;
`

export const EditProjectInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;
`

export const TitleAndColor = styled.div`
  display: flex;
  align-items: center;
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
  overflow: auto;
`

export const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
`

export const CancelButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.textPrimary};

  cursor: pointer;
`

export const SubmitButton = styled.button`
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
    color: ${(props) => props.theme.cardBgSecondary};
    cursor: not-allowed;
  }
`

export const ExcludeProjectButton = styled.button`
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.error};
  color: ${(props) => props.theme.error};
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      font-size: 1.25rem;
      font-weight: bold;
    }
  }

  &:hover {
    background-color: ${(props) => props.theme.error};
    color: ${(props) => props.theme.textPrimary};
  }
`

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

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  justify-content: end;
`

export const ExcludeMessage = styled.div`
  background-color: ${(props) => props.theme.error};
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
`

export const LabelInput = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input {
    border: 1px solid ${(props) => props.theme.borderCard};
    outline: none;
    background-color: ${(props) => props.theme.cardBgPrimary};
    padding: 0.75rem;
    border-radius: 6px;
    color: ${(props) => props.theme.textPrimary};
  }
`
