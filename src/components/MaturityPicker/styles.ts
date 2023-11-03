import styled from 'styled-components'

export const Container = styled.div`
  input {
    background-color: ${(props) => props.theme.cardBgPrimary};
    border: 1px solid ${(props) => props.theme.borderCard};
    color: ${(props) => props.theme.textPrimary};
    padding: 0.25rem;
    border-radius: 6px;

    cursor: pointer;

    &:focus {
      outline: none;
      border: 1px solid ${(props) => props.theme.enphasis};
    }
  }
`
