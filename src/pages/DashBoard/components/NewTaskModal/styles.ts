import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0 0 0 / 0.5);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

export const DialogContent = styled(Dialog.Content)`
  background-color: ${(props) => props.theme.cardBgPrimary};
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
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

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const DialogCloese = styled(Dialog.Close)`
  border: 0;
  background-color: transparent;
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s ease-in-out;

  svg {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    line-height: 0;
  }

  &:hover {
    transform: scale(1.2);
  }
`

export const NewTaskForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const InputTitle = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  input {
    border-radius: 6px;
    outline: 0;
    height: 1.8rem;
    padding: 1.5rem 1rem;
    background-color: ${(props) => props.theme.cardBgSecondary};
    border: 1px solid ${(props) => props.theme.borderCard};
    color: ${(props) => props.theme.textPrimary};

    &:focus {
      outline: 2px solid ${(props) => props.theme.enphasis};
    }
  }
`

export const FlexArea = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;

  label {
    flex: 1;
  }
`

export const InputPriority = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  select {
    border-radius: 6px;
    height: 3rem;
    width: 100%;
    padding: 0.75rem;
    background-color: ${(props) => props.theme.cardBgSecondary};
    border: 1px solid ${(props) => props.theme.borderCard};
    outline: 0;
    color: ${(props) => props.theme.textPrimary};

    &:focus {
      outline: 2px solid ${(props) => props.theme.enphasis};
    }
  }
`

export const InputDate = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  input {
    border-radius: 6px;
    height: 3rem;
    padding: 0.75rem;
    width: 100%;
    background-color: ${(props) => props.theme.cardBgSecondary};
    border: 1px solid ${(props) => props.theme.borderCard};
    outline: 0;
    color: ${(props) => props.theme.textPrimary};

    &:focus {
      outline: 2px solid ${(props) => props.theme.enphasis};
    }
  }
`

export const InputTextArea = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  textarea {
    border-radius: 6px;
    height: 10rem;
    resize: none;
    padding: 1rem;
    width: 100%;
    background-color: ${(props) => props.theme.cardBgSecondary};
    border: 1px solid ${(props) => props.theme.borderCard};
    outline: 0;
    color: ${(props) => props.theme.textPrimary};

    &:focus {
      outline: 2px solid ${(props) => props.theme.enphasis};
    }
  }
`

export const FormFooter = styled.div`
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

export const SaveButton = styled.button`
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
