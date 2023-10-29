import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0 0 0 / 0.75);
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

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`

export const FlexArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
`

export const InputTitle = styled.label`
  width: 100%;
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

export const InputColor = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const ColorDemonstration = styled.div`
  background-color: ${(props) => props.theme.borderCard};
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  align-items: center;

  svg {
    line-height: none;
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
  justify-content: end;
  gap: 1rem;
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
