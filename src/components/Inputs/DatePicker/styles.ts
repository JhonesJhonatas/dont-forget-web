import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span {
    font-size: 0.75rem;
  }

  input {
    outline: none;
    border: none;
    background-color: ${(props) => props.theme.cardBgPrimary};
    padding: 0.48rem;
    border-radius: 6px;
    color: ${(props) => props.theme.textPrimary};
  }
`
