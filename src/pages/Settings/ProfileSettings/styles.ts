import styled from 'styled-components'

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
