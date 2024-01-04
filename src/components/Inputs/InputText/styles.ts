import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  input {
    outline: none;
    border: none;
    background-color: ${(props) => props.theme.cardBgPrimary};
    border: 1px solid ${(props) => props.theme.borderCard};
    padding: 0.48rem;
    border-radius: 6px;
    color: ${(props) => props.theme.textPrimary};
  }
`

export const LabelArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  small {
    font-size: 0.75rem;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`

export const RequiredMessage = styled.small`
  color: ${(props) => props.theme.error};
`

export const ErrorMessage = styled.small`
  color: ${(props) => props.theme.error};
`
