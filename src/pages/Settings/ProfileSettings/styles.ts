import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import hexToRgba from 'hex-to-rgba'

export const Container = styled.div`
  padding: 2rem;
  height: 95%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const Avatar = styled.div`
  img {
    max-width: 6rem;
    max-height: 6rem;
  }
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: 0.5rem;

  span:first-child {
    font-size: 1.5rem;
    font-weight: bold;
  }
`

export const AccountSettings = styled.div`
  background-color: ${(props) => props.theme.cardBgSecondary};
  padding: 1rem;
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FormTitle = styled.span`
  font-weight: bold;
`

export const StyledForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FieldsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ButtonsArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
`

export const FlexArea = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 2rem;
`

export const ContentArea = styled.div`
  background-color: ${(props) => props.theme.cardBgSecondary};
  padding: 1rem;
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Description = styled.span``

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: ${(props) => props.theme.background};
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0.7;
`

export const DialogContent = styled(Dialog.Content)`
  background-color: ${(props) => props.theme.cardBgSecondary};
  padding: 1rem;
  border-radius: 6px;
  width: 30rem;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const StyledInputText = styled.input`
  outline: none;
  border: none;
  background-color: ${(props) => props.theme.cardBgPrimary};
  border: 1px solid ${(props) => props.theme.borderCard};
  padding: 0.48rem;
  border-radius: 6px;
  color: ${(props) => props.theme.textPrimary};
`

export const ConfirmatedEmailArea = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;

  background-color: ${(props) => hexToRgba(props.theme.sucess, 0.1)};
  border: 1px solid ${(props) => props.theme.sucess};
`
