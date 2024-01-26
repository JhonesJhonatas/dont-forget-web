import styled from 'styled-components'

export const CreateUserContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BoxLogin = styled.div`
  background-color: ${(props) => props.theme.cardBgSecondary};
  border: 1px solid ${(props) => props.theme.borderCard};
  width: 32rem;
  border-radius: 6px;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const LabelInput = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
