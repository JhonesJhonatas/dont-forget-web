import styled from 'styled-components'

export const Container = styled.div`
  padding: 2rem;
  height: 95%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const PasswordArea = styled.div`
  background-color: ${(props) => props.theme.cardBgSecondary};
  padding: 1rem;
  border-radius: 6px;
`

export const StyledForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
`

export const FormTitle = styled.span``

export const FieldsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FlexArea = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 2rem;
`

export const ButtonsArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
`
